import _0x4f3072 from "gemini-ai";
import _0x5387a0 from "node-gtts";
import { join } from "path";
import { readFileSync, unlinkSync } from "fs";
let handler = async (_0x479cbb, {
  conn: _0x248bb9,
  command: _0xd152ca,
  args: _0x24576d
}) => {
  const _0x670e7e = _0x24576d.join` `;
  if (!_0x670e7e) {
    return _0x248bb9.reply(_0x479cbb.chat, "معك Gemini الذكاء الاصطناعي من شركة غوغل يمكنك استخدامي عبر كتابة مثلا هكذا :\n\n*." + _0xd152ca + "* من هو جيميناي > Jeen-MD", null);
  }
  const _0x539885 = new _0x4f3072("AIzaSyAUsz6CEsTfOw3CgecJGtbzkBNnKBXy2tI");
  const _0x2581b7 = _0x539885.createChat();
  let _0x57dbb6 = await _0x2581b7.ask(_0x670e7e);
  _0x248bb9.sendPresenceUpdate("composing", _0x479cbb.chat);
  const _0x53ae49 = await GoogleAudio(_0x57dbb6, "ar");
  const _0xd3b26 = {
    audio: _0x53ae49,
    fileName: "error.mp3",
    mimetype: "audio/mpeg",
    ptt: true
  };
  await _0x248bb9.sendMessage(_0x479cbb.chat, _0xd3b26, {
    quoted: _0x479cbb
  });
  _0x248bb9.reply(_0x479cbb.chat, _0x57dbb6, null);
};
handler.command = /^aivoice?$/i;
handler.tags = ["ai"];
handler.help = ["aivoice"];
export default handler;
async function GoogleAudio(_0x28d3eb = "error", _0x35a286 = "ar") {
  return new Promise((_0x581f9f, _0x3fc4c0) => {
    try {
      const _0x1c6616 = _0x5387a0(_0x35a286);
      const _0x369e1b = join(global.__dirname(import.meta.url), "../tmp", new Date() * 1 + ".wav");
      _0x1c6616.save(_0x369e1b, _0x28d3eb, () => {
        _0x581f9f(readFileSync(_0x369e1b));
        unlinkSync(_0x369e1b);
      });
    } catch (_0x2292ed) {
      _0x3fc4c0(_0x2292ed);
    }
  });
}
