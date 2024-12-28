import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw '*Download applications with the additional obb file* \n\n Example :\n ' + usedPrefix + command + ' free fire';
  let info = await apkinfo(text);
  let res = await apk(text);

  if (res.size > 2000000000) {
    throw '*APK file too large. Maximum download size is 2GB.*';
  }

  let message = await conn.sendMessage(m.chat, {
    image: { url: info.icon },
    caption: `*App Name:* \n${info.name}\n*Package Name:* \n${info.packageN} \n\n> *Edgar-MD*`,
    footer: '_Apk files...',
  });

 
  await conn.sendMessage(
    m.chat,
    { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
    { quoted: m }
  );

  if (info.obb) {
    await conn.sendMessage(m.chat, {
      text: `Downloading OBB file for ${info.name}...`,
    });

    let obbRes = await fetch(info.obb_link);
    let obbMimetype = obbRes.headers.get('content-type');

    await conn.sendMessage(
      m.chat,
      { document: { url: info.obb_link }, mimetype: obbMimetype, fileName: `${info.packageN}.obb` },
      { quoted: m }
    );
  }
};

handler.command = /^(apk)$/i;
handler.help = ['apk'];
handler.tags = ['applications'];
handler.premium = false;
handler.limit = 5
handler.rigister = true;

export default handler;

async function apkinfo(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + url + '&limit=1');
  let $ = await res.json();

  try {
    let icon = $.datalist.list[0].icon;
  } catch {
    throw 'Failed to load the application, sorry';
  }

  let icon = $.datalist.list[0].icon;
  let name = $.datalist.list[0].name;
  let packageN = $.datalist.list[0].package;
  let download = $.datalist.list[0].file.path;
  let obb_link;
  let obb;

  try {
    obb_link = $.datalist.list[0].obb.main.path;
    obb = true;
  } catch {
    obb_link = '_Not found_';
    obb = false;
  }

  if (!download) throw 'Failed to load the application, sorry';
  return { obb, obb_link, name, icon, packageN };
}

async function apk(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
  let $ = await res.json();
  let fileName = $.datalist.list[0].package + '.apk';
  let download = $.datalist.list[0].file.path;
  let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');
  if (!download) throw 'Failed to load the application, sorry';
  let icon = $.datalist.list[0].icon;
  let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

  return { fileName, mimetype, download, size };
}
