import fetch from "node-fetch";

// Handler function to convert text to video
let handler = async (message, { conn, text }) => {
  // Check if the user provided any text
  if (!text) {
    throw "Please provide a description or video text, e.g. '.txt2video sad story'";
  }

  try {
    // Notify the user that the video is being created
    message.reply("It may take a while to send the video.");

    // Create an instance of Vidnoz to interact with the API
    let vidnoz = new Vidnoz();

    // Generate a task ID by sending the text to the Vidnoz API to convert it into a video
    let taskId = await vidnoz.textToVideo(text, "Relaxing", 0, 2, 206);

    // Use setTimeout wrapped in a Promise to simulate delay
    await new Promise(resolve => setTimeout(resolve, 300000)); // 5 minutes delay

    // Fetch the status of the video creation task
    let taskData = await vidnoz.getTask(taskId);

    // Prepare the video URL and additional data for sending
    const videoData = {
      url: taskData.additional_data.video_url
    };

    // Send the video to the user
    await conn.sendMessage(message.chat, {
      video: videoData,
      caption: "`" + text + "`\n< Jeen-MD\n\n⏳: " + taskData.additional_data.duration + " *seconds*",
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: taskData.action,
          body: taskData.additional_data.video_url,
          mediaType: 1,
          thumbnail: await (await conn.getFile(taskData.additional_data.thumbnail_url)).data,
          sourceUrl: taskData.additional_data.video_url
        }
      }
    }, { quoted: message });
  } catch (error) {
    // Handle any errors that occurred during the process
    throw new Error("An error occurred: " + error.message);
  }
};

// Define the command and tags for the handler
handler.help = handler.command = ["txt2video"];
handler.tags = ["ai"];

export default handler;

// Utility function to generate a random IP address
const generateRandomIp = () => {
  const randomByte = () => Math.floor(Math.random() * 256);
  return `${randomByte()}.${randomByte()}.${randomByte()}.${randomByte()}`;
};

// Vidnoz API client class
class Vidnoz {
  constructor(authToken = null) {
    this.authToken = authToken;
    this.apiBaseUrl = "https://tool-api.vidnoz.com/ai/tool";
  }

  // Helper function to get the headers for API requests
  async getHeaders() {
    return {
      "Content-Type": "application/json",
      "X-TASK-VERSION": "2.0.0",
      Authorization: `Bearer ${this.authToken}`,
      "x-forwarded-for": generateRandomIp()
    };
  }

  // Function to make POST requests to the Vidnoz API
  async postData(url = "", data = {}) {
    const headers = await this.getHeaders();
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    return response.json();
  }

  // Function to create a video from text using the Vidnoz API
  async textToVideo(text, backgroundMusic, subtitles, voiceGender, voiceType) {
    const requestData = {
      text,
      make_background_music: backgroundMusic,
      subtitles,
      voiceOver_gender: voiceGender,
      voiceOver_voice: voiceType,
      language: "EN"
    };

    try {
      const response = await this.postData(`${this.apiBaseUrl}/text-to-video`, requestData);
      return response.data.task_id;
    } catch (error) {
      throw new Error("Error creating video: " + error.message);
    }
  }

  // Function to get the task status of the video generation
  async getTask(taskId) {
    try {
      const response = await this.postData(`${this.apiBaseUrl}/get-task`, { id: taskId });
      let taskData = response.data;

      // Poll the task status every 5 seconds until it is completed
      while (taskData.status === -2) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        const updatedResponse = await this.postData(`${this.apiBaseUrl}/get-task`, { id: taskId });
        taskData = updatedResponse.data;
      }

      return taskData;
    } catch (error) {
      throw new Error("Error fetching task: " + error.message);
    }
  }
}