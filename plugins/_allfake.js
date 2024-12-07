import _0x76b774 from "fs";
import _0x27b036 from "node-fetch";
import _0x4d9827 from "moment-timezone";
import _0x127451 from "axios";
import _0x1b5e8d from "performance-now";
let handler = _0x32f7bd => _0x32f7bd;
handler.all = async function (_0x439f91) {
  let _0x34efe9 = await conn.getName(_0x439f91.sender);
  let _0x1a118f = "https://i.ibb.co/wMdhHsw/12cefc4e9ec1bba6fb1a315c30ebf938.jpg";
  let _0x19667c = "https://i.ibb.co/wMdhHsw/12cefc4e9ec1bba6fb1a315c30ebf938.jpg";
  try {
    _0x1a118f = await this.profilePictureUrl(_0x439f91.sender, "image");
  } catch (_0x14f81d) {} finally {
    global.emror = "https://i.ibb.co/wMdhHsw/12cefc4e9ec1bba6fb1a315c30ebf938.jpg";
    global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"]);
    global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000]);
    global.axios = (await import("axios")).default;
    global.fetch = (await import("node-fetch")).default;
    global.cheerio = (await import("cheerio")).default;
    global.fs = (await import("fs")).default;
    let _0x4200d5 = _0x1b5e8d();
    let _0x59b311 = _0x1b5e8d() - _0x4200d5;
    let _0xfd7158 = await _0x59b311.toFixed(4);
    const _0x31f04c = process.uptime() * 1000;
    global.kontak2 = [[owner[0], await conn.getName(owner[0] + "212710723717@s.whatsapp.net"), "Ayoub dev", "https://whatsapp.com", true]];
    const _0x37f038 = {
      fromMe: false,
      participant: _0x439f91.sender,
      ...(_0x439f91.chat ? {
        remoteJid: "BROADCAST GROUP"
      } : {})
    };
    global.fkon = {
      key: _0x37f038,
      message: {
        contactMessage: {
          displayName: "" + _0x34efe9,
          vcard: "BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:" + _0x34efe9 + "\nitem1.TEL;waid=" + _0x439f91.sender.split("@")[0] + ":" + _0x439f91.sender.split("@")[0] + "\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
        }
      }
    };
    global.ephemeral = "86400";
    global.ucapan = ucapan();
    global.botdate = date();
    const _0x21b246 = {
      newsletterJid: "120363372688988248@newsletter",
      serverMessageId: 103,
      newsletterName: "💫 ping : " + _0xfd7158 + "   © [ اضغط هنا ]    "
    };
    global.adReply = {
      contextInfo: {
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: _0x21b246,
        externalAdReply: {
          showAdAttribution: true,
          title: info.namebot,
          body: ucapan(),
          previewType: "VIDEO",
          thumbnailUrl: "https://i.ibb.co/wMdhHsw/12cefc4e9ec1bba6fb1a315c30ebf938.jpg",
          sourceUrl: "https://instagram.com/ayoub.eeea"
        }
      }
    };
    global.fakeig = {
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: info.namebot,
          body: ucapan(),
          thumbnailUrl: _0x1a118f,
          sourceUrl: url.sig
        }
      }
    };
  }
};
export default handler;
function date() {
  let _0x1b59f4 = new Date(new Date() + 3600000);
  let _0x214005 = "id";
  let _0x39aba0 = _0x1b59f4.toLocaleDateString(_0x214005, {
    weekday: "long"
  });
  let _0x46811b = _0x1b59f4.toLocaleDateString(_0x214005, {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  let _0x291b1a = _0x39aba0 + ", " + _0x46811b;
  return _0x291b1a;
}
function ucapan() {
  const _0x2aff10 = _0x4d9827.tz("Africa/casablanca").format("HH");
  let _0x49c512 = "إضغط هنا لمتابعة صاحب البوت";
  if (_0x2aff10 >= 4) {
    _0x49c512 = "إضغط هنا لمتابعة صاحب البوت";
  }
  if (_0x2aff10 > 10) {
    _0x49c512 = "إضغط هنا لمتابعة صاحب البوت";
  }
  if (_0x2aff10 >= 15) {
    _0x49c512 = "إضغط هنا لمتابعة صاحب البوت";
  }
  if (_0x2aff10 >= 18) {
    _0x49c512 = "إضغط هنا لمتابعة صاحب البوت ";
  }
  return _0x49c512;
}
function pickRandom(_0x370de2) {
  return _0x370de2[Math.floor(_0x370de2.length * Math.random())];
}
