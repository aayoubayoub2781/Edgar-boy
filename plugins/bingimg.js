import { BingImageCreator } from "../lib/bingimg.js";
export const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text;
  if (args.length >= 1) {
    text = args.slice(0).join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    throw "*تخيل والبوت يرسم  مثال 😉:*\n .bingimg cat play with man";
  }
  await m.reply("المرجو الانتظار سنحاول رسم صورتك ...\n *Edgar-MD*");
  try {
    const res = new BingImageCreator({
      cookie: "_C_Auth=; ipv6=hit=1733580315998&t=4; SRCHD=AF=NOFORM; SRCHUID=V=2&GUID=6A066713359F4B16A44672822FFF96B7&dmnchg=1; _SS=SID=3A4388072F0F6A6B29E59D492E596BF8; MUID=03A644C2B96366692AD2518CB835679B; MUIDB=03A644C2B96366692AD2518CB835679B; _EDGE_S=F=1&SID=3A4388072F0F6A6B29E59D492E596BF8; _EDGE_V=1; MUIDB=03A644C2B96366692AD2518CB835679B; _clck=1jqblld%7C2%7Cfri%7C0%7C1802; CSRFCookie=96e07725-8e15-4759-98cf-0d569b7c571f; SRCHUSR=DOB=20241207&POEX=W; ANON=A=EE8D2915AFE4F5D86917265FFFFFFFFF&E=1e92&W=1; NAP=V=1.9&E=1e38&C=6Akmb5eq7p8WQLHYZMB6lyrC38am9QnwgRLQhLn7urAuFuxhNlPkwA&W=1; PPLState=1; KievRPSSecAuth=FACSBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACOHuUTEQHXdyUAR1wnjD7PI8gZaolM+7yuf5gp2WtNinqna5Xuz1GhAsEGA7gjl43MiiHbzsfBCQ/eFOsvZN4By/Qsu6j+8LmZuWk6Fs04fdCN/QES0rniPcZufor0GAd6hcBibpcFlt7nK9H/dCk2gBTSoYBqKEz4GWg+xEpHuQafEpOVANDuo4IwbpsvGm0LrLFaNpw9+mCRuGUKwuNcUEmczBMw3gZREGemuCVqG0Mkl9AvwiQ7s66rLmiFgCRVwnW6q7RgrGuxQBtoi/f0hNUuNW8mkba05dhFzWseqB6XGPg0O0TzkydMzhkEic1bVPgzdHdpdxD8dzbNDaEvO42RhOlsptiGvCD+shorMihl7NY6QrHKL+2OLwv/rqzp4jFtfS5m65RWrtR9QJBqrsxTHYDu2FuwQCiNjjaofzYLVHYV6q6AZgNon1EqJxp1avGWsafn1WT2IsuczwjDLGdW822KfBlM9WkM8PJKuMA7G6yCmtRn/Ei0b8ezmiI5g2DKZaQVnm/A+A64unSfyMPqBL1l2uBBHBDZ2u0oHnd3OJRW5axfQPLfNNMubNAUqhlFJvqD0Tc5bry4+X8MWUvaUbb7Lk8tNqwEpB3z+6DoD8sA2l6a1fZv3xeA0bAlifHOG8gbc/73HzZperUk6PhVw5obFyqONBQsOOPEYEJUIaJrmo4T3mpYZhI+YbQiAWWer5gGo0gKs50zbxiDqD2U52OOvbqwfpFOOzUsqcvhKMweCUPkILb2Qg3Mb9PCQW2w98jmgS54yokCUvIRtHlDQJwEicgKmYj10iVCFTgsW7GSNSCcjEtqqUHXZ3aJGHL1NgXPKb3c7BcqoNJqFSMX2rSlefSyeSO/C5u83RKW8uhTv0gfJtI0MI28kKuUahWKE769hO+3ESEBz1G6e/nj4GAaTRwZm6oNLJ7bXgqDd9bkAFd0yXrTdkxbRfHuD0DwJZ9gb4eG4ytu0tXRGBdPBsFhp6aHTaib3kfnqyZkfAhRmcTxbLZ9XRf3VxBC5Vn+32KzMaLoPo42975fi+YaZlmntrwrBuRAXvmu1OJb9YMA0AR7Y0k/pJAE1u/AnjQNfzd+eAWOWKDu9JrOdSOE36htIuf5I98xRzqO0g9ZORKkc6n6Q2RJOR86xYqVKPpRR/ph7nmkGe3sct1b7b37bvy5l5t2mqvSPGmgvYdz/ccYWlRcQtDjlaVfNrHGdcilLZmDowMIRJCpICAI3vrmIQ5SX5MyUr2/AJJS3Afn5h2NtfpjloHgsNj/HGjXg4BAPbpeFUZFTM8wAl4usQt+l+OsEZY7HTB32l7TqF8M+NGYqUiXu8wYRibwJtnIS4coZfuEKmgtw82Ki9ogAKsEfTooLMpH0Bk/yf7IdAylknLduoTIqzR+EW00d+WKuxXErm+Cn46oz7zXZ8DZH9UXm/jqBNijpDT/ZBcovEPaGFJWNbYIZLkUR2Wg4XfzC1d+TgjSE+YmEUAFuECUlnq1GT0XHa3pa1dJ3BU+1r; _U=1n7lWfrIrDd56ZONn3nyM-YTt39mEkiZ-a7Co4Hf9ag9pSBmSxV19RUvXogJyVvm56g3xKiV2cXcMXQwrSt49y5V1Uuo1FEZ_JTVplFq70sdrzIXAS-42dXR1wotXvELI_IdSk6DBUkF0MEFu4y-koP80LRN5N2xWIXxWoHOVCVsrXmWvfFLPbwJ8hTWLxf6q2IIy8hjvTAgs1JUicJv3bGwlISAD3V6SM0hfutr1IPU; WLS=C=911dcf52a24554b7&N=mogammee; WLID=B9B73jqg1BprPkMnjp+G5AtZJabQEGwLQDJ7p9jJ3gyxgcS72DXOeg51lPcarhErIcXPhX3TS/Hrp8x0mprj4nYNvvE6DAG5o11ca+xaGHM=; MMCASM=ID=298D8849CF2248839AFC913C43D58892; _clsk=vucxtq%7C1733576796318%7C5%7C0%7Cd.clarity.ms%2Fcollect; SRCHHPGUSR=SRCHLANG=en&DM=0&CW=1280&CH=2195&SCW=1280&SCH=2195&BRW=MW&BRH=MT&DPR=2.8&UTC=60&HV=1733576716&WTS=63869173514&PRVCW=1280&PRVCH=2325"
    });
    const data = await res.createImage(text);
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        try {
          if (!data[i].endsWith(".svg")) {
            await conn.sendFile(m.chat, data[i], "", `😎 *(${i + 1}/${data.length})*\n\n*Prompt*: ${text}`, m, false, {
              mentions: [m.sender]
            });
          }
        } catch (error) {
          console.error(`Error sending file: ${error.message}`);
          await m.reply(`Failed to send image *(${i + 1}/${data.length})*`);
        }
      }
    } else {
      await m.reply("لم يتم العثور على أي صورة.");
    }
  } catch (error) {
    console.error(`Error in handler: ${error.message}`);
    await m.reply(`${error}\n\n${error.message}`);
  }
};
handler.help = ["bingimg"];
handler.tags = ["drawing"];
handler.command = ["bingimg"];
export default handler;
