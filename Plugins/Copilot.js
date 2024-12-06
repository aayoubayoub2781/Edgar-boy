const nomor = [{
  name: "Microsoft Copilot",
  jid: "18772241042@s.whatsapp.net"
}];
let handler = async (_0x2206d0, {
  conn: _0x40a85c,
  args: _0x57a81c
}) => {
  let _0x3b309f;
  if (_0x57a81c.length >= 1) {
    _0x3b309f = _0x57a81c.join(" ");
  } else if (_0x2206d0.quoted && _0x2206d0.quoted.text) {
    _0x3b309f = _0x2206d0.quoted.text;
  } else {
    throw "هذا الامر خاص بالذكاء الاصطناعي الخاص ب ميكروسوفت مثال: \n *.microsoft* do you know some thing about The Monalisa?.";
  }
  let _0xcb550a = _0x2206d0.quoted ? _0x2206d0.quoted : _0x2206d0;
  let _0x5ec4c2 = (_0xcb550a.msg || _0xcb550a).mimetype || "";
  await _0x2206d0.reply(wait);
  let _0x5183e0 = null;
  if (/image\/(png|jpe?g)/.test(_0x5ec4c2)) {
    _0x5183e0 = await _0xcb550a.download();
  } else if (_0x5ec4c2) {
    return await _0x2206d0.reply("تنسيق الصورة غير مدعوم.");
  }
  if (_0x5183e0) {
    const _0x504622 = {
      image: _0x5183e0,
      caption: _0x3b309f
    };
    const _0x4020c6 = {
      quoted: _0x2206d0
    };
    await _0x40a85c.sendMessage(nomor[0].jid, _0x504622, _0x4020c6);
  } else {
    const _0x77d4ec = {
      text: _0x3b309f
    };
    const _0x31367d = {
      quoted: _0x2206d0
    };
    await _0x40a85c.sendMessage(nomor[0].jid, _0x77d4ec, _0x31367d);
  }
  let _0xc8e846 = () => {
    return new Promise(_0x3957fa => {
      _0x40a85c.ev.on("messages.upsert", ({
        messages: _0x523591
      }) => {
        let _0x4d62a0 = _0x523591[0];
        if (_0x4d62a0.key.remoteJid === nomor[0].jid && _0x4d62a0.message?.conversation) {
          _0x3957fa(_0x4d62a0.message.conversation);
        }
      });
    });
  };
  let _0x3178da = await _0xc8e846();
  await _0x2206d0.reply(_0x3178da);
};
handler.help = ["copilot"];
handler.tags = ["ai"];
handler.command = ["copilot"];
handler.private = false;
export default handler;
