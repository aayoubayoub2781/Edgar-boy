import { getBinaryNodeChildString } from "@whiskeysockets/baileys";
import _0x29c085 from "node-fetch";
const linkRegex = /https:\/\/whatsapp\.com\/channel\/([0-9A-Za-z]*)/i;
const handler = async (_0x272819, {
  conn: _0x4a42f1,
  usedPrefix: _0x13c755,
  command: _0x147eaf,
  text: _0x54e7ab
}) => {
  let [_0x1ac2c3, _0xbad6b4] = _0x54e7ab.match(linkRegex) || [];
  if (!_0xbad6b4) {
    throw "• *مثال:* : \n\n " + (_0x13c755 + _0x147eaf) + " https://whatsapp.com/channel/0029VayqYQDBVJl5mVZsit1G";
  }
  await _0x4a42f1.sendMessage(_0x272819.chat, {
    react: {
      text: "🕒",
      key: _0x272819.key
    }
  });
  try {
    let _0x3bb051 = await newsletterInviteInfo(_0xbad6b4);
    let _0x319897 = _0x3bb051.profileUrl;
    _0x3bb051.creation = new Date(_0x3bb051.creation).toISOString().replace("T", " ").split(".")[0];
    _0x3bb051.subjectTime = new Date(_0x3bb051.subjectTime).toISOString().replace("T", " ").split(".")[0];
    delete _0x3bb051.profileUrl;
    if (_0x3bb051.settings["[object Promise]"]) {
      _0x3bb051.settings = "Reaction Codes";
    }
    let _0x567630 = _0x3bb051.settings;
    let _0x1a2f82 = "عرض معلومات القناة\n\n";
    _0x1a2f82 += "ID : " + _0x3bb051.id + "\n";
    _0x1a2f82 += "الاسم : " + _0x3bb051.subject + "\n";
    _0x1a2f82 += "تاريخ الإنشاء : " + _0x3bb051.creation + "\n";
    _0x1a2f82 += "تاريخ تغيير الموضوع : " + _0x3bb051.subjectTime + "\n";
    _0x1a2f82 += "عدد المتابعين : " + (_0x3bb051.followers ? _0x3bb051.followers : "غير معروف") + "\n";
    _0x1a2f82 += "الحالة : " + _0x3bb051.status + "\n";
    _0x1a2f82 += "الإعدادات : " + _0x3bb051.settings + "\n";
    _0x1a2f82 += "موثق : " + _0x3bb051.verified + "\n";
    _0x1a2f82 += "الوصف : " + _0x3bb051.desc;
    const _0x11c5d7 = {
      url: _0x319897
    };
    const _0x1340c6 = {
      image: _0x11c5d7,
      caption: _0x1a2f82
    };
    await _0x4a42f1.sendMessage(_0x272819.chat, _0x1340c6, {
      quoted: _0x272819
    });
    await _0x4a42f1.sendMessage(_0x272819.chat, {
      react: {
        text: "",
        key: _0x272819.key
      }
    });
  } catch (_0x187261) {
    await _0x272819.reply(String(_0x187261));
    await _0x4a42f1.sendMessage(_0x272819.chat, {
      react: {
        text: "",
        key: _0x272819.key
      }
    });
  }
};
handler.command = ["inspectchannel"];
handler.tags = ["tools"];
handler.help = ["inspectchannel"];
export default handler;
const toUpper = async _0xc574d7 => {
  return _0xc574d7.toUpperCase();
};
const extractNewsLetter = async (_0x5e88a1 = {}) => {
  const _0x4ca24b = _0xf27be6 => {
    const _0xcdc38e = Object.entries(_0xf27be6);
    const _0x56c872 = _0xcdc38e.reduce((_0xbfa3cc, [_0x3060af, _0x3d8194]) => {
      _0xbfa3cc[toUpper(_0x3060af.replace(/_/g, " "))] = typeof _0x3d8194 === "object" ? !!_0x3d8194.value : _0x3d8194;
      return _0xbfa3cc;
    }, {});
    return Object.fromEntries(Object.entries(_0x56c872));
  };
  return {
    id: _0x5e88a1.id,
    inviteCode: _0x5e88a1.thread_metadata.invite,
    subject: _0x5e88a1.thread_metadata.name?.text || "",
    subjectTime: Number(_0x5e88a1.thread_metadata.name?.update_time / 1000) || 0,
    status: _0x5e88a1.state.type || false,
    creation: Number(_0x5e88a1.thread_metadata.creation_time * 1000),
    desc: _0x5e88a1.thread_metadata.description?.text || "",
    descTime: Number(_0x5e88a1.thread_metadata.description?.update_time / 1000) || 0,
    settings: _0x5e88a1.thread_metadata.settings && _0x4ca24b(_0x5e88a1.thread_metadata.settings) || null,
    followers: Number(_0x5e88a1.thread_metadata.subscribers_count) || false,
    verified: /verified/i.test(_0x5e88a1.thread_metadata.verification) || false,
    profileUrl: _0x5e88a1.thread_metadata.picture ? "https://pps.whatsapp.net" + _0x5e88a1.thread_metadata.picture.direct_path : "https://pps.whatsapp.net" + _0x5e88a1.thread_metadata.preview.direct_path || false
  };
};
const newsletterInviteInfo = async _0x3f02a3 => {
  const _0x20bcbc = {
    key: _0x3f02a3,
    type: "INVITE",
    view_role: "GUEST"
  };
  const _0xc93b3f = {
    input: _0x20bcbc,
    fetch_viewer_metadata: false,
    fetch_full_image: true,
    fetch_creation_time: true
  };
  const _0x19eba9 = {
    variables: _0xc93b3f
  };
  let _0x132877 = _0x19eba9;
  let _0x3bbd63 = await conn.query({
    tag: "iq",
    attrs: {
      id: conn.generateMessageTag(),
      to: "@s.whatsapp.net",
      type: "get",
      xmlns: "w:mex"
    },
    content: [{
      tag: "query",
      attrs: {
        query_id: "6620195908089573"
      },
      content: Buffer.from(JSON.stringify(_0x132877))
    }]
  });
  let _0x30c311 = JSON.parse(getBinaryNodeChildString(_0x3bbd63, "result"));
  return extractNewsLetter(_0x30c311.data.xwa2_newsletter);
};
