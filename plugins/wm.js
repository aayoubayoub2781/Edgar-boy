import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
    if (!m.quoted) throw '👀┇المرجو الرد على الملصق واضافة اسم الحزمة والكاتب لستيكر الذي تريد سرقته او تعديله\nمثال : .wm Edgar-Bot┇😎'
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        
        // Prepend "Jeen-md" to the packname
        packname = " Edgar Bot | " + (packname || '')
        
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw '👀┇يااخي حاول تنزل الاستيكر مجددا!┇😅'
        let img = await m.quoted.download()
        if (!img) throw '  📥 خطا.. حاول تنزل الاستيكر مجددا!┇🚨'
        stiker = await addExif(img, packname, author || '')
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) {
            conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
        } else {
            throw '😔┇هناك خطا! تأكد انك رديت على استيكر وضفت اسم الحزمة !┇🚨'
        }
    }
}

handler.help = ['wm <حقوقك>']
handler.tags = ['sticker']
handler.command = /^sticker-wm|wm$/i
export default handler
