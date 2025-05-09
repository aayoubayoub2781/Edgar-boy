import fs from 'fs'

let timeout = 60000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {}
    let id = m.chat
    if (id in conn.tekateki) {
        conn.reply(m.chat, '*❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯*', conn.tekateki[id][0])
        throw false
    }
    let tekateki = JSON.parse(fs.readFileSync(`./src/game/انمي.json`))
    let json = tekateki[Math.floor(Math.random() * tekateki.length)]
    let _clue = json.response
    let clue = _clue.replace(/[A-Za-z]/g, '_')
    let caption = `*⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*

*⌬ ❛╏ ${json.question}*

*⌬ ❛╏ الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)}*

*⌬ ❛╏ الـجـائـزة💰↞ ${poin} نقاط*

*⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*
> Jeen-Team
`.trim()
    conn.tekateki[id] = [
       await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) await conn.reply(m.chat, `*⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*
            *⌬ ❛╏  انتهى الوقت*
            *⌬ ❛╏ الاجابه اهي  ${json.response}*
            *⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*
            > Edgar-MD`, conn.tekateki[id][0])
            delete conn.tekateki[id]
        }, timeout)
    ]
}

handler.help = ['fun-anime']
handler.tags = ['fun']
handler.command = /^(fun-anime|ask-anime)$/i

export default handler
