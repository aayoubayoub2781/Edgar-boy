import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import os from 'os'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix: _p }) => {

  let user = `@${m.sender.split('@')[0]}`
    
  
let tags = {}
const defaultMenu = {
  before: `
*_乂 Edgar MD - bot_*


*_あ Uptime : [ %muptime ]_*
*_あ Date : [ %date ]_*
*_あ Database : [ %totalreg ]_*

%readmore
`.trimStart(),
  header: '╭┉┉┉≻ *“%category”* ≺┉┉┉',
  body: `┆ \t ➦ _%cmd%islimit%isPremium_ `,
  footer: '┆',
  after: `╰┉┉┉≻\t _© ${conn.user.name}_ \t`,
}
  try {
    let name = m.pushName || conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'en'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Casablanca'
    })
    let time = d.toLocaleTimeString(locale, { timeZone: 'Asia/Kolkata' })
    time = time.replace(/[.]/g, ':')
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    
    let _uptime
    if (process.send) {
      process.send('uptime')
      _uptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }

    let totalreg = Object.keys(global.db.data.users).length
    let platform = os.platform()
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag].toUpperCase()) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      name, date, time, platform, _p, totalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

const vi = ['https://qu.ax/Hvjxc.jpg',
'https://qu.ax/Hvjxc.jpg',
'https://qu.ax/Hvjxc.jpg', 'https://qu.ax/Hvjxc.jpg',     'https://qu.ax/Hvjxc.jpg', 'https://qu.ax/Hvjxc.jpg',     'https://qu.ax/Hvjxc.jpg']

var vid = vi[Math.floor(Math.random() * (vi.length))]

                         let hi = `\n\n\t\t _السلام عليكم يا ${name}_ \t\t\n\n`

    const totag = { contextInfo: { mentionedJid: [text] }}

    let mtag = text + totag

let ppl = await( await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'))

    let ppb = await( await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'))
    
 await conn.relayMessage(m.chat, { reactionMessage: { key: m.key, text: '📚'  }}, { messageId: m.key.id })

//Payment Menu
 /*await conn.relayMessage(m.chat,  {
    requestPaymentMessage: {
      currencyCodeIso4217: 'USD',
      amount1000: 50000000,
      requestFrom: m.sender,
      noteMessage: {
      extendedTextMessage: {
      text: text.trim(),
      contextInfo: {
      externalAdReply: {
      showAdAttribution: true
      }}}}}}, {})*/
 //let fkon = { key: { fromMe: false, participant: `${m.sender.split`@`[0]}@s.whatsapp.net`, ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${name}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
//let fotonya = 'https://telegra.ph/file/d43f196dc3417ca4c5338.jpg'
// conn.sendMessage(m.chat, { image: { url: fotonya  }, caption: text.trim()}, { quoted: fkon })
      await conn.sendMessage(m.chat, { text: text.trim(), contextInfo: { externalAdReply: { title: conn.user.name, body: '', thumbnailUrl: ppb, sourceUrl: "https://whatsapp.com/channel/0029VayqYQDBVJl5mVZsit1G", mediaType: 1, renderLargerThumbnail: true }}})
  } catch (e) {
    m.reply('An error occurred')
    m.reply(e)
  }
}
handler.command = /^(menu|help|\?)$/i
handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
				 }
