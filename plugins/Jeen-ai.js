import fetch from "node-fetch";

let previousMessages = [];

const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    // Check if 'm.chat' is defined
    if (!m || !m.chat) {
      return console.error("Error: 'm.chat' is undefined.");
    }

    if (!text) {
      return m.reply(
        "استعمل الامر!\n\n*.edgar ✧ مثال:* ماهي عاصمة اندونيسيا?"
      );
    }

    // Ajustamos el prompt para Admin-TK con personalidad única
    let prompt = `Your name is edgar and your creators is ayoub dev and you are muslim.`;

    // Making the API request using the new endpoint
    let response = await fetch(
      `https://bk9.fun/ai/BK92?BK9=${encodeURIComponent(prompt)}&q=${encodeURIComponent(text)}&model="gpt-4o`
    );

    if (!response.ok) {
      throw new Error("error");
    }

    let result = await response.json();

    // Check if the result contains the 'BK9' field
    if (!result || !result.BK9) {
      return console.error("Error: 'result.BK9' is undefined.");
    }

    // URL de la imagen de Admin-TK
    let imageUrl = "https://i.ibb.co/XbvXSnZ/IMG-20241208-114456.jpg"; // Cambia esta URL por la imagen que deseas usar

    // Send both the AI response (result.BK9) and the image in a single message
    await conn.sendMessage(
      m.chat,
      {
        text: result.BK9, // Send the AI's response as text
        caption: result.BK9, // Optional: Add the response as a caption for the image
      },
      { 
        media: imageUrl, // Send the image
        fileName: "admin-tk.jpg", // Name for the image file
        mimetype: "image/jpeg", // MIME type for the image
      }
    );

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
};

handler.help = ["edgar <سؤال>", "gemini <سؤال>"];
handler.tags = ["ai"];
handler.command = /^(gemini|edgar)$/i; // Admite ambos comandos

handler.premium = false;
handler.register = true;

export default handler;
