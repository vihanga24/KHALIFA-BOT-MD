// VERSI PAIRING ( DARWIN BIKIN ANJG )
// GAUSAH DELETE NAMA GW, LU CUMAN PAKE DASAR KROCO
"use strict";
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
require("./settings.js")
const {
  default: makeWaSocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  PHONENUMBER_MCC,
  jidDecode,
  proto,
  makeCacheableSignalKeyStore,
} = global.baileys
const fs = require("fs");
const logg = require('pino')
const qrcode = require('qrcode')
const simple = require('./lib/simple') 
const CFonts = require('cfonts')
const path = require('path')
const { Boom } = require('@hapi/boom')
const _ = require('lodash')
const axios = require ('axios')
const PhoneNumber = require('awesome-phonenumber')
const readline = require('readline');
//const welcome = JSON.parse(fs.readFileSync('./database/welcome.json'));
const { color} = require("./lib/color");
const spin = require('spinnies')
const {getRandom, getBuffer,sleep} = require("./lib/myfunc");
if(runWith.includes("eplit")){
}
const connect = require("./server.js")
const PORT = process.env.PORT || 3000 


let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})


process.env.TZ = "Asia/Makassar"
process.on('uncaughtException', console.error)
const pairingCode = process.argv.includes("--pairing")
// Spinner Console
const spinner = { 
  "interval": 120,
  "frames": [
"✖ [░░░░░░░░░░░░░░░]",
"✖ [■░░░░░░░░░░░░░░]",
"✖ [■■░░░░░░░░░░░░░]",
"✖ [■■■░░░░░░░░░░░░]",
"✖ [■■■■░░░░░░░░░░░]",
"✖ [■■■■■░░░░░░░░░░]",
"✖ [■■■■■■░░░░░░░░░]",
"✖ [■■■■■■■░░░░░░░░]",
"✖ [■■■■■■■■░░░░░░░]",
"✖ [■■■■■■■■■░░░░░░]",
"✖ [■■■■■■■■■■░░░░░]",
"✖ [■■■■■■■■■■■░░░░]",
"✖ [■■■■■■■■■■■■░░░]",
"✖ [■■■■■■■■■■■■■░░]",
"✖ [■■■■■■■■■■■■■■░]",
"✖ [■■■■■■■■■■■■■■■]"
  ]}
let globalSpinner;
const getGlobalSpinner = (disableSpins = false) => {
if(!globalSpinner) globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins});
return globalSpinner;
}
let spins = getGlobalSpinner(false)
const start = (id, text) => {
spins.add(id, {text: text})
}
const success = (id, text) => {
spins.succeed(id, {text: text})

}

CFonts.say('fearless', {
  font: 'chrome',
  align: 'left',
  gradient: ['red', 'magenta']
})


const useStore = !process.argv.includes('--no-store')
const doReplies = !process.argv.includes('--no-reply')
const useMobile = process.argv.includes('--mobile')

// Read line interface
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


const store = makeInMemoryStore({ logger: logg().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = useMultiFileAuthState(global.sessionName)



const connectToWhatsApp = async () => {

 //Function untuk update runtime di database
setInterval(() => {

let data = global.db.data.others['runtime']

if(data){ 
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
console.log("Runtime di perbarui")
} else data.lastTime = + new Date
} else{ global.db.data.others['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
console.log("New update runtime")
}

},60_000)
  
const {Low} = (await import("lowdb"))
const chalk =  (await import("chalk"))
const { JSONFile } = (await import("lowdb/node"))
global.db = new Low( new JSONFile(`database/database.json`))
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(alice), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
allcommand: [],
anonymous: [],
blockcmd: [],
banned: [],
premium: [],
claim: [],
data: [],
sewa: [],
antispam: [],
dashboard: [],
listerror: [],
respon: {},
sticker: {},
audio: {},
hittoday: [],
clearchat: [],
users: {},
chats: {},
settings : {},
kickon: {},
others: {},
...(global.db.data || {})
}
global.db.chain = _.chain(global.db.data)
}
loadDatabase()

  
const { state, saveCreds } = await useMultiFileAuthState("session")
//const store = useStore? makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) }) : undefined
const store = makeInMemoryStore({ logger: logg().child({ level: 'fatal', stream: 'store' }) })
const { version, isLatest } = await fetchLatestBaileysVersion()
if (global.db.data) await global.db.write() 

  
  
//Function untuk update runtime di database
setInterval(() => {
let data = global.db.data.others['runtime']
if(data){ 
if((new Date - data.lastTime) > (60000*60)){
data.runtime = + new Date
data.lastTime = + new Date
console.log("Runtime di perbarui")
} else data.lastTime = + new Date
} else{ global.db.data.others['runtime'] = {
runtime: + new Date,
lastTime: + new Date
}
console.log("New update runtime")
}

},60_000)

  

//Funtion agar pesan bot tidak pending  
const getMessage = async (key) => {
if(store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'hallo'
}
}


//Untuk menyimpan session  
const auth = {
creds: state.creds,
/** caching membuat penyimpanan lebih cepat untuk mengirim/menerima pesan */
keys: makeCacheableSignalKeyStore(state.keys, logg().child({ level: 'fatal', stream: 'store' })),
}
 
const connectionOptions = {
version,
printQRInTerminal: !global.usePairingCode,
logger: logg({ level: 'fatal' }),
auth,
getMessage,
//browser: ['IOS','IOS','2.1.0'],
//browser: ['Chrome (Linux)'],
//browser: ['Chrome (Linux)', '', ''],
//browser: Browsers.macOS('Desktop'),
//Jika ubuntu mengalami gangguan, ganti browser di atas
browser: ["Ubuntu","Chrome","20.0.04"],
connectTimeoutMs: 60_000,
defaultQueryTimeoutMs: 0,
keepAliveIntervalMs: 10000,
emitOwnEvents: true,
fireInitQueries: true,
generateHighQualityLinkPreview: true,
syncFullHistory: true,
markOnlineOnConnect: true,
}
 
global.alice = simple.makeWASocket(connectionOptions)
connect(alice, PORT)

store.bind(alice.ev)
alice.waVersion = version



if (global.usePairingCode && !alice.authState.creds.registered) {
if (useMobile) throw new Error('Cannot use pairing code with mobile api')

let phoneNumber
if (!!global.pairingNumber) {
phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '')

if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))
process.exit(0)
}
} else {
phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

// Ask again when entering the wrong number
if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx")))

phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
rl.close()
}
}

setTimeout(async () => {
let code = await alice.requestPairingCode(phoneNumber)
code = code?.match(/.{1,4}/g)?.join("-") || code
console.log(`Your Pairing Code : ${code}`)
}, 3000)
}

    


//welcome
alice.ev.on('group-participants.update', async (anu) => {
require('./message/group.js')(alice, anu)
})


  //auto reject call
alice.ev.on('call', (json) => { 
  const {id, from, status } = json[0]; 
  if (status == 'offer') {
		if(from == global.ownerjid) return
    console.log(json)
    alice.rejectCall(id, from)
   // await sleep (2000)
    alice.sendMessage(from, {text: `I'm busy, don't talk me`});
  } 
})
alice.cMod = (jid, copy, text = '', sender = alice.user.id, options = {}) => {
//let copy = message.toJSON()
let mtype = Object.keys(copy.message)[0]
let isEphemeral = mtype === 'ephemeralMessage'
if (isEphemeral) {
mtype = Object.keys(copy.message.ephemeralMessage.message)[0]}
let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
let content = msg[mtype]
if (typeof content === 'string') msg[mtype] = text || content
else if (content.caption) content.caption = text || content.caption
else if (content.text) content.text = text || content.text
if (typeof content !== 'string') msg[mtype] = {
...content,
...options}
if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
copy.key.remoteJid = jid
copy.key.fromMe = sender === alice.user.id
return proto.WebMessageInfo.fromObject(copy)}


  
alice.ev.on('messages.upsert', async (chatUpdate) => {
try{
if (global.db.data) await global.db.write() 
if (!chatUpdate.messages) return;
var m = chatUpdate.messages[0] || chatUpdate.messages[chatUpdate.messages.length - 1]
if (!m.message) return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = simple.smsg(alice, m, store)
 
require('./message/case')(alice, m, chatUpdate,store)
  
}catch (err){
//Log("Error bro")
console.log(err)
}
  })
  
           
  
alice.ev.process(async(events) => {

if(events['connection.update']) {
const update = events['connection.update']
const { connection, lastDisconnect } = update
const  reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (global.db.data == null) await loadDatabase() 
if (connection === 'close') {
console.log(color(lastDisconnect.error, 'deeppink'));

if(lastDisconnect.error == "Error: Stream Errored (unknown)"){
process.send('reset')

} else if (reason === DisconnectReason.badSession) { 
  
console.log(color(`Bad Session File, Please Delete Session and Scan Again`)); 
process.send('reset')
  
} else if (reason === DisconnectReason.connectionClosed) { 
  
console.log(color("[SYSTEM]", "white"), color('Connection closed, reconnecting...', 'deeppink')); 
process.send('reset')
  
} else if (reason === DisconnectReason.connectionLost) { 
  
console.log(color("[SYSTEM]", "white"), color('Connection lost, trying to reconnect', 'deeppink'));
process.send('reset')
  
} else if (reason === DisconnectReason.connectionReplaced) { 
  
console.log(color("Connection Replaced, Another New Session Opened, Please Close Current Session First"));
alice.logout(); 
  
} else if (reason === DisconnectReason.loggedOut) { 
  
console.log(color(`Device Logged Out, Please Scan Again And Run.`)); 
alice.logout(); 
  
} else if (reason === DisconnectReason.restartRequired) {
  
console.log(color("Restart Required, Restarting...")); 
connectToWhatsApp(); 
process.send('reset')
  
} else if (reason === DisconnectReason.timedOut) {
  
console.log(color("Connection TimedOut, Reconnecting..."));
connectToWhatsApp(); 

}

} else if (connection === 'connecting') {
//console.log(`${color(`[`,`white`)+color(`1`,`red`)+color(`]`,`white`)}`,`WA v${version.join('.')}`)
//await sleep(400) 
console.log(`${color(`[`,`white`)+color(`2`,`red`)+color(`]`,`white`)}`,`${calender}`)
//await sleep(400)  
console.log(`${color(`[`,`white`)+color(`4`,`red`)+color(`]`,`white`)}`,"data 5") 
//await sleep(400)  
console.log(color(`]─`,`magenta`),`「`,  color(`FREE SCRIPT`,`red`), `」`,  color(`─[`,`magenta`))
//await sleep(400)  
//start(`1`,`Connecting...`)
} else if (connection === 'open') {
alice.sendMessage('94714201875@s.whatsapp.net', {text: `*[ System Notice ]* Hallo owner, saya darwin ingin memberi tahukan bahwa script ini tidak untuk di perjual belikan! dengan sangat saya mempringatkan, jika anda ketahuan menjual script seenaknya, saya pastikan nomor anda tidak ada lagi di Whatsapp`})
//success(`1`,`[■■■■■■■■■■■■■■■] Connected`) 
console.log(`${color(`[■■■■■■■■■■■■■■■] Connected`, 'green')}`)
}
}

// kredensial diperbarui -- simpan
if(events['creds.update']) { 
await saveCreds()
}

  

// history received
if(events['messaging-history.set']) {
const { chats, contacts, messages, isLatest } = events['messaging-history.set']
console.log(`recv ${chats.length} chats, ${contacts.length} contacts, ${messages.length} msgs (is latest: ${isLatest})`)
			}  
  

  
//------------------------------------[BATAS]--------------------------------\\

})

  //Function untuk update gempa BMKG
let gempa = db.data.others['updateGempa']
let data1 = db.data.others['infogempa']
if(!gempa) db.data.others['updateGempa'] = []

if(gempa && gempa.length > 0){

setInterval(async() => {
const {data} = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")
let nana = /TimurLaut|Tenggara|BaratDaya|BaratLaut|Utara|Timur|Selatan|Barat/
//console.log(data.Infogempa)
let lokasi = data.Infogempa.gempa.Wilayah //.split("km")[1].replace(nana,"").replace(" ",'').replace(" ","")
let waktu = data.Infogempa.gempa.Jam
let caption = ` *INFO GEMPA*

*Tanggal:* ${data.Infogempa.gempa.Tanggal}
*Waktu:* ${data.Infogempa.gempa.Jam}
*Kordinat:* ${data.Infogempa.gempa.Coordinates}
*Magnitudo:* ${data.Infogempa.gempa.Magnitude}
*Kedalaman:* ${data.Infogempa.gempa.Kedalaman}
*Lokasi:* ${data.Infogempa.gempa.Wilayah}
*Potention:* ${data.Infogempa.gempa.Potensi}
*Effect:* ${data.Infogempa.gempa.Dirasakan}

*Note:*
_Untuk menonaktifkan fitur otomatis update gempa tersebut, silahkan ketik .updategempa off_
`

if(data1){
let getGroups = await alice.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)
let image = {url:"https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap}
  
if(data1.lokasi !== lokasi && data1.lokasi !== waktu){
 
data1.lokasi = lokasi
data1.waktu = waktu
  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(3000)
alice.sendMessage(i,{image,caption}) 
}
}
}

  
} else {
let getGroups = await alice.groupFetchAllParticipating()
let groupss = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anus = groupss.map(v => v.id)

db.data.others['infogempa'] = {
lokasi : lokasi,
waktu: waktu
}

  
for(let i of gempa){
if(!anus.includes(i)) {
gempa.splice(gempa.indexOf(i,1)) 
console.log("menghapus auto update gempa pada group")
} else {
await sleep(3000)
alice.sendMessage(i,{image,caption}) 
}
}
 
} 

}, 60_000*10)// akhir dari set interval

}// akhir dari gempa.length




    

 


 const Log = (text) =>{
  console.log(text)
 }
  



  function clockString(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " hari, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " jam, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " menit, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " detik") : "";
let time = d > 0 ? dDisplay + hDisplay + mDisplay + sDisplay : hDisplay + mDisplay + sDisplay
return time
}


	
global.chalk = chalk
global.clockString = clockString
global.Log = Log

	return alice
 }

connectToWhatsApp()