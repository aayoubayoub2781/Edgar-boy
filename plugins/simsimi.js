import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw ` هلا يا *${name}*, هل تريد التحدث ؟ رد مع *${usedPrefix + command}* (رسالتك)\n\n📌 مثال: *${usedPrefix + command}* هلا كيفك`;
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `text=${encodeURIComponent(text)}&lc=ar&key=`
  };

  const res = await fetch('https://api.simsimi.vn/v1/simtalk', options);
  const json = await res.json();

  if (json.status === '200') {
    const reply = json.message;

    // Check if SimSimi is requesting to be taught
    if (reply.includes("Teach me")) {
      throw `هلا *${name}*, يبدو أن SimSimi يرغب في أن تعلمه!`;
    }

    m.reply(reply);
  } else {
    throw json.message; // Only throw the 'message' field as an error
  }
};

handler.help = ['zizo'];
handler.tags = ['tools'];
handler.command = ['zizo'];
handler.owner = false;


export default handler;
