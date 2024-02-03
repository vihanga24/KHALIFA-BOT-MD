const util = require('util')
const moment = require("moment-timezone");
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const fs = require("fs");
const { color } = require("../lib/color");
const { getBuffer, getRandom, getGroupAdmins,sleep} = require("../lib/myfunc");
const {TelegraPh} = require('../lib/uploader')
const fetch = require('node-fetch');
const chalk = require('chalk')
const bg = "https://tinyurl.com/y23xrfhu"
//require("../settings.js")



module.exports = async(alice, anu) => {
	//console.log(anu)
var jeda = false
if(jeda) return console.log('spam welcome aktif')
jeda = true
try{
if(anu.action == "remove" && anu.participants[0].split("@")[0].includes(alice.user.id.split(":")[0]) ) return
const { id, participants, action } = anu
const type1 = setwelcome == "type1"
const type2 = setwelcome == "type2"
const type3 = setwelcome == "type3"
const from = anu.id
const botNumber = alice.user.jid 
const groupMetadata = await alice.groupMetadata(from) || (alice.chats[from] || {}).metadata
const groupName =  groupMetadata.subject || []
const groupMet = await alice.groupMetadata(from)
const groupLength = groupMetadata.participants.length
const sender = anu.participants[0];
const senderNumber = sender.split("@")[0];
const groupMembers =  groupMetadata.participants || []
const groupAdmins = getGroupAdmins(groupMembers) || []
const groupDesc =  groupMetadata.desc || []
const groupOwner =  groupMetadata.owner || []
const mem = anu.participants[0];
const memNumber = mem.split("@")[0];
const user = groupMembers.find(u => alice.decodeJid(u.id) === sender)  || {} 
const bot = groupMembers.find(u => alice.decodeJid(u.id) == alice.user.jid) || {} 
const isRAdmin = user && user.admin == 'superadmin' || false
const isAdmin = isRAdmin || user && user.admin == 'admin' || false 
const isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?  
const pushname =  await alice.getName(sender)
const oneMem = anu.participants.length === 1
const itsMe = sender === botNumber
const timeWib = moment.tz("Asia/Jakarta").format("HH:mm")
const chat = global.db.data.chats[id] || {}
const add = action == "add" 
const remove = action == "remove"
const memb = groupMet.participants.length
let m = {
chat :from,
pushname : pushname,
sender : sender
}

//Group Update Console.log
if (add && oneMem) console.log(chalk.magenta("[GRUP UPDATE]"), chalk.green(`${pushname} telah bergabung di grub`), chalk.magenta(`${groupName}`))
if (remove && oneMem) console.log(chalk.magenta("[GRUP UPDATE]"), chalk.green(`${pushname} telah keluar dari grub`), chalk.magenta(`${groupName}`))

//Auto kick jika itu user yang sudah di tandai
let kickon = db.data.kickon[from]
if(add && kickon && kickon.includes(senderNumber)){
	
let teks = `@${senderNumber} Cie masuk lagi
out aje loe udh gw tandai sebagai user Biadap!!` 
       
await alice.sendMessage(from, {text: teks,contextInfo: {mentionedJid: [sender]}},{quoted: m})
if(!isBotAdmin) return alice.sendMessage(from, {text: `Gagal  mengeluarkan @${senderNumber} dari group karena bot bukan admin`,contextInfo: {mentionedJid: [sender]}},{quoted: m})
if(isBotAdmin) return alice.groupParticipantsUpdate(from, [sender], 'remove')
} 
  
try { //To get photo of user
var pp = await alice.profilePictureUrl(sender, 'image')
} catch (e) {
var pp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}
  
try { // To get photo of group
var ppgc = await alice.profilePictureUrl(from, 'image')
} catch (e) {
var ppgc = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
}
    
const contextInfo = { 
mentionedJid: [sender],
externalAdReply:{
showAdAttribution: true, 
title: `Join To ${groupName}`,
//body: `Member ke : ${memb}`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: 'https://telegra.ph/file/20d7b1b68a2a7736ca148.jpg',
sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS'
}
}  
switch (action) {
case 'add':{
let teks = `0ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 WELCOME 」*
│ Hallo *@user*💐
│ *Member ke : ${memb}*
│ Mau kartu intro? ketik .intro
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙
Deskripsi : \n@desc`

let yui = fs.readFileSync('./temp/audio/welcome.mp3')

const welcomeText =  (chat.sWelcome|| teks).replace('user', await alice.getName(sender)).replace('@desc', groupDesc.toString() || 'unknow') 
if (chat.welcome && !itsMe && oneMem)
alice.sendMessage(from, { contextInfo, text: welcomeText })
alice.sendMessage(m.chat,{
audio: yui,mimetype:'audio/mp4', ptt:true })
  
}
break
case 'remove':{
let teks = `0ཻུ۪۪ꦽꦼ̷⸙‹•══════════════♡᭄
│       *「 GOOD BYEE 」*
│ Sayonara *@user*💐
│ *Member ke : ${memb}*
│ Balik Lagi Lu Bawa Gorengan Se Truk Yee
╰═════ꪶ ཻུ۪۪ꦽꦼ̷⸙ ━ ━ ━ ━ ꪶ ཻུ۪۪ꦽꦼ̷⸙`
let contextInfo = { 
mentionedJid: [sender],
externalAdReply:{
showAdAttribution: true, 
title: `${groupName}`,
//body: `Member ke : ${memb}`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: 'https://telegra.ph/file/9ca6150957be137c62a39.jpg',
sourceUrl: 'https://chat.whatsapp.com/Fguw4KxsP6qCBm9RfZvHOS'
}
}  
let alice = fs.readFileSync('./temp/audio/left.mp3')

const welcomeText =  (chat.sWelcome|| teks).replace('user', await alice.getName(sender)).replace('@desc', groupDesc.toString() || 'unknow') 
if (chat.welcome && !itsMe && oneMem)
alice.sendMessage(from, { contextInfo, text: welcomeText })
alice.sendMessage(m.chat,{audio: alice,mimetype:'audio/mp4', ptt:true })
}
break
    


}// Akhir dari swith action
  
  
await sleep(5000)  
jeda = false

  
} catch (err) {
jeda = false
console.log(err)
let e = String(err) 
if (e.includes("this.isZero")) {return}
if (e.includes("rate-overlimit")) {return}
if (e.includes('connection Closed')){ return }
if (e.includes('Timed Out')){ return }
console.log(chalk.white('GROUP :'), chalk.green(e))
}   
}

//----------------< Batas >--------------\\


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})


















