import fs from 'fs';
import path from 'path';
import ytdl from 'youtubedl-core';
import { Client } from 'undici';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat];
  if (!args || !args[0]) throw `✳️ Example:\n${usedPrefix + command}`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that the YouTube link`;
  await m.react('⏳');

  const videoDetails = await ytddl(args[0]);
  if (!videoDetails) throw `❎ Error downloading video`;

  console.log('Video Details:', videoDetails); // Log video details for debugging

  const { url, title, author, description } = videoDetails;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the video URL');
  }

  // Check if the content is indeed a video (M3U8 playlist)
  const contentType = response.headers.get('content-type');
  console.log('Fetched Content-Type:', contentType);

  if (!contentType || contentType !== 'application/vnd.apple.mpegurl') {
    throw new Error('The fetched URL is not a valid video (it might be an HLS stream).');
  }

  // Download and convert HLS stream using ffmpeg
  const videoFilePath = path.join(__dirname, `${title || 'video'}.mp4`);
  await downloadAndConvertHLS(url, videoFilePath);

  const caption = `✼ ••๑⋯❀ Y O U T U B E ❀⋯⋅๑•• ✼
  
❏ Title: ${title || 'Unknown'}
❒ Author: ${author || 'Unknown'}
❒ Description: ${description || 'No description available'}
❒ Link: ${args[0]}
⊱─━⊱༻●༺⊰━─⊰`;

  // Send the video after conversion
  conn.sendFile(m.chat, videoFilePath, `${title || 'video'}.mp4`, caption, m, false, { asDocument: chat.useDocument });

  await m.react('✅');
};

// Function to download and convert HLS stream to MP4 using ffmpeg
async function downloadAndConvertHLS(hlsUrl, outputPath) {
  try {
    console.log(`Downloading and converting HLS stream to MP4: ${hlsUrl}`);

    // Use ffmpeg to download and convert HLS to MP4
    const command = `ffmpeg -i "${hlsUrl}" -c copy -bsf:a aac_adtstoasc "${outputPath}"`;

    // Execute the command and wait for completion
    await execPromise(command);
    console.log(`Successfully converted HLS stream to MP4: ${outputPath}`);
  } catch (error) {
    console.error('Error during download and conversion:', error);
    throw new Error('Failed to convert HLS stream to MP4');
  }
}

handler.help = ['ytmp4 <yt-link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'video', 'ytv'];
handler.diamond = false;

export default handler;

async function getCookies() {
  const cookiesPath = path.resolve(__dirname, '../assets/cookies.json');
  if (!fs.existsSync(cookiesPath)) {
    throw new Error('Cookies file not found');
  }
  return JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
}

async function createClient() {
  const cookies = await getCookies();
  return new Client("https://www.youtube.com", {
    headers: {
      "Cookie": cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
    }
  });
}

async function ytddl(url) {
  try {
    const client = await createClient();
    const yt = await ytdl.getInfo(url, { requestOptions: { client: client } });

    console.log('YouTube Info:', yt); // Log the full video info to see available formats

    // Find the highest video + audio format, or separate video and audio formats
    const videoFormat = ytdl.chooseFormat(yt.formats, { quality: 'highest', filter: 'video' });
    const audioFormat = ytdl.chooseFormat(yt.formats, { quality: 'highest', filter: 'audio' });

    console.log('Selected Video Format:', videoFormat);  // Log the selected video format
    console.log('Selected Audio Format:', audioFormat);  // Log the selected audio format

    if (!videoFormat || !audioFormat) {
      throw new Error('No suitable video or audio format found');
    }

    // Return video details with proper URL and metadata
    return {
      url: videoFormat.url, // Use video URL (can combine video + audio if necessary)
      title: yt.videoDetails.title,
      author: yt.videoDetails.author.name,
      description: yt.videoDetails.description,
    };
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Ensure null is returned on error
  }
                            }