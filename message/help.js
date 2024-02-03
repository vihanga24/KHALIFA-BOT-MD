const version = require("@whiskeysockets/baileys/package.json").version
const moment = require("moment-timezone");
const fs = require("fs");
const chalk = require('chalk')
const timeWib = moment().tz('Asia/Jakarta').format('HH:mm:ss')
const timeWit= moment().tz('Asia/Makassar').format('HH:mm:ss')
const timeWita = moment().tz('Asia/Jayapura').format('HH:mm:ss')
const { color, bgcolor } = require('../lib/color')
const {kyun} = require("../lib/myfunc");
moment.tz.setDefault("Asia/Jakarta").locale("id");

let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 Januari 2023').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
let week = d.toLocaleDateString(locale, { weekday: 'long' })
const calender = d.toLocaleDateString("id", {
day: 'numeric',
month: 'long',
year: 'numeric'
})

////Total fitur by Official Dittaz
const totalFitur = () =>{
var mytext = fs.readFileSync("./message/case.js").toString()
var numUpper = (mytext.match(/case/g) || []).length;
return numUpper
}

const more = String.fromCharCode(8206)
const readmore = more.repeat(4001) 


let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)

let dot = new Date(new Date + 3600000)
const dateIslamic = Intl.DateTimeFormat("id" + '-TN-u-ca-islamic', {day: 'numeric',month: 'long',year: 'numeric'}).format(dot)


exports.allmenu =  ( limitCount, isPremium,thisHit, publik, sender, prefix, pushname) => {
try{ 
var saldo = db.data.users[sender].balance.toLocaleString() 
} catch{ 
var saldo = db.data.users[sender].balance
}
return `⩽⩾ *${botName}*
⩽⩾ ${week}, ${calender} 
⩽⩾ ${dateIslamic}
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
│⩽⩾ *Nama* : ${pushname}
│⩽⩾ *Status* : ${isPremium ? 'Premium':'Free'}
│⩽⩾ *Limit* : ${isPremium ? 'Unlimited' : `${db.data.users[sender].limit}`}
│⩽⩾ *Limit game* : ${isPremium ? 'Unlimited' : `${db.data.users[sender].glimit}`}
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
「 𝗜𝗡𝗙𝗢 𝗕𝗢𝗧𝗭 」
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
│⩽⩾ *Nama Bot* : ${botName}
│⩽⩾ *Running* : panel
│⩽⩾ *Total User* : ${Object.keys(db.data.users).length}
│⩽⩾ *Total Feature* : ${totalFitur()}
│⩽⩾ *Total Error* : ${db.data.listerror.length} 
│⩽⩾ *User Banned* : ${db.data.banned.length}
│⩽⩾ *Cmd Blocked* : ${db.data.blockcmd.length} 
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
`}

exports.fitur = (prefix) => {
return`
❍┈┈「 *MENU MENU* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.totalfitur
╎│•⟢.dashboard
╎│•⟢.runtime
╎│•⟢.rules
╎│•⟢.speed
╎│•⟢.ping
╎│•⟢.owner
╎│•⟢.tqto
╎│•⟢.gcbot
╎│•⟢.sc
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU AI* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.ai
╎│•⟢.miku
╎│•⟢.luffy
╎│•⟢.robin
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU DOWNLOAD* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.play
╎│•⟢.tiktok
╎│•⟢.ttaudio
╎│•⟢.ttsearch
╎│•⟢.ytmp3
╎│•⟢.ytmp4
╎│•⟢.instagram
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU CONVERT* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.tomp3
╎│•⟢.tovn
╎│•⟢.toimg
╎│•⟢.togif
╎│•⟢.terbalik
╎│•⟢.bass
╎│•⟢.blown
╎│•⟢.deep
╎│•⟢.earrape
╎│•⟢.fast
╎│•⟢.fat
╎│•⟢.nightcore
╎│•⟢.reverse
╎│•⟢.robot
╎│•⟢.slow
╎│•⟢.moth
╎│•⟢.tupai
╎│•⟢.
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU TOOLS* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.tinyurl
╎│•⟢.tourl
╎│•⟢.get
╎│•⟢.ssweb
╎│•⟢.playstore
╎│•⟢.watpad
╎│•⟢.lirik
╎│•⟢.removebg
╎│•⟢.song
╎│•⟢.translate
╎│•⟢.kodebahasa
╎│•⟢.remini
╎│•⟢.jadianime
╎│•⟢.pinterest
╎│•⟢.txt2img
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU STICKER* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.sticker
╎│•⟢.smeme
╎│•⟢.swm
╎│•⟢.ttp
╎│•⟢.attp
╎│•⟢.emojimix
╎│•⟢.mukelu
╎│•⟢.gurastick
╎│•⟢.lovestick
╎│•⟢.dogestick
╎│•⟢.paimon
╎│•⟢.patrick
╎│•⟢.cry
╎│•⟢.kill
╎│•⟢.hug
╎│•⟢.pat
╎│•⟢.lick
╎│•⟢.kiss
╎│•⟢.bite
╎│•⟢.yeet
╎│•⟢.bully
╎│•⟢.bonk
╎│•⟢.wink
╎│•⟢.poke
╎│•⟢.nom
╎│•⟢.slap
╎│•⟢.smile
╎│•⟢.wave
╎│•⟢.awoo
╎│•⟢.blush
╎│•⟢.smug
╎│•⟢.glomp
╎│•⟢.happy
╎│•⟢.dance
╎│•⟢.cringe
╎│•⟢.cuddle
╎│•⟢.highfive
╎│•⟢.handhold
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU GROUP* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.on [ options ]
╎│•⟢.gc [ options ]
╎│•⟢.setnamegc
╎│•⟢.setppgc
╎│•⟢.setdesc
╎│•⟢.resetlinkgc
╎│•⟢.linkgc
╎│•⟢.promote
╎│•⟢.demote
╎│•⟢.kick
╎│•⟢.addkick
╎│•⟢.delkick
╎│•⟢.listkick
╎│•⟢.hidetag
╎│•⟢.tagall
╎│•⟢.add
╎│•⟢.closetime
╎│•⟢.opentime
╎│•⟢.limit
╎│•⟢.profil
╎│•⟢.buylimit
╎│•⟢.claim
╎│•⟢.ceksider
╎│•⟢.listonline
╎│•⟢.del
╎│•⟢.cekasalmember
╎│•⟢.topbalance
╎│•⟢.caridoi
╎│•⟢.getppgc
╎│•⟢.getpp
╎│•⟢.tagme
╎│•⟢.givesaldo
╎│•⟢.givelimit
╎│•⟢.kurangsaldo
╎│•⟢.kuranglimit
╎│•⟢.intro
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *ANONYMOUS* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.confes
╎│•⟢.menfes
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU EPHOTO* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.writetext
╎│•⟢.advancedglow
╎│•⟢.typographytext
╎│•⟢.pixelglitch
╎│•⟢.neonglitch
╎│•⟢.flagtext
╎│•⟢.flag3dtext
╎│•⟢.deletingtext
╎│•⟢.blackpinkstyle
╎│•⟢.glowingtext
╎│•⟢.underwatertext
╎│•⟢.logomaker
╎│•⟢.cartoonstyle
╎│•⟢.papercutstyle
╎│•⟢.watercolortext
╎│•⟢.effectclouds
╎│•⟢.blackpinklogo
╎│•⟢.gradienttext
╎│•⟢.summerbeach
╎│•⟢.luxurygold
╎│•⟢.glitchtext
╎│•⟢.multicoloredneon
╎│•⟢.sandsummer
╎│•⟢.galaxywallpaper
╎│•⟢.1917style
╎│•⟢.makingneon
╎│•⟢.royaltext
╎│•⟢.freecreate
╎│•⟢.galaxystyle
╎│•⟢.lighteffects
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU TEXTPRO* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.flamimg1-6
╎│•⟢.pornhub
╎│•⟢.glitch
╎│•⟢.avenger
╎│•⟢.space
╎│•⟢.ninjalogo
╎│•⟢.marvelstudio
╎│•⟢.lionlogo
╎│•⟢.wolflogo
╎│•⟢.steel3d
╎│•⟢.wallgravity
╎│•⟢.blackpink
╎│•⟢.neon
╎│•⟢.greenneon
╎│•⟢.advanceglow
╎│•⟢.futureneon
╎│•⟢.sandwriting
╎│•⟢.sandsummer
╎│•⟢.sandengraved
╎│•⟢.metaldark
╎│•⟢.neonlight
╎│•⟢.holographic
╎│•⟢.text1917
╎│•⟢.minion
╎│•⟢.deluxesilver
╎│•⟢.newyearcard
╎│•⟢.bloodfrosted
╎│•⟢.halloween
╎│•⟢.jokerlogo
╎│•⟢.fireworksparkle
╎│•⟢.natureleaves
╎│•⟢.bokeh
╎│•⟢.toxic
╎│•⟢.strawberry
╎│•⟢.bok3d
╎│•⟢.breakwall
╎│•⟢.icecold
╎│•⟢.luxury
╎│•⟢.cloud
╎│•⟢.summersand
╎│•⟢.horrorblood
╎│•⟢.thunder
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU FUN* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.bisakah
╎│•⟢.bagaimanakah
╎│•⟢.apakah
╎│•⟢.kapankah
╎│•⟢.cekwatak
╎│•⟢.cekhobby
╎│•⟢.cekmemek
╎│•⟢.cekkontol
╎│•⟢.cebelapaimutciaku
╎│•⟢.tiktokghea
╎│•⟢.tiktokpanrika
╎│•⟢.tiktokbocil
╎│•⟢.tiktokkayes
╎│•⟢.cosplayangel
╎│•⟢.videogalau
╎│•⟢.wibuvid
╎│•⟢.chinese
╎│•⟢.hijab
╎│•⟢.indo
╎│•⟢.japanese
╎│•⟢.korean
╎│•⟢.malaysia
╎│•⟢.randomgirl
╎│•⟢.randomboy
╎│•⟢.thailand
╎│•⟢.vietnam
╎│•⟢.hentaivid
╎│•⟢.jjmeryani
╎│•⟢.bucinserti
╎│•⟢.pacarsertifikat
╎│•⟢.tololsertifikat
╎│•⟢.genjot
╎│•⟢.nenen
╎│•⟢.perkosa
╎│•⟢.curhat
╎│•⟢.paptt
╎│•⟢.jadian
╎│•⟢.jodohku
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU ANIME* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.anime
╎│•⟢.randomanime
╎│•⟢.naotomori
╎│•⟢.loli
╎│•⟢.cosplay
╎│•⟢.husbu
╎│•⟢.milf
╎│•⟢.wallml
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU ISLAMIC* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.kisahnabi
╎│•⟢.alquran
╎│•⟢.alquranaudio
╎│•⟢.asmaulhusna
╎│•⟢.islamic
╎│•⟢.jadwalsholat
╎│•⟢.surah
╎│•⟢.listsurah
╎│•⟢.getsurah
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU RANDOM* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.cyberspace
╎│•⟢.mountain
╎│•⟢.programing
╎│•⟢.technology
╎│•⟢.memeindo
╎│•⟢.pantun
╎│•⟢.motivasi
╎│•⟢.katabijak
╎│•⟢.dilanquote
╎│•⟢.truth
╎│•⟢.dare
╎│•⟢.infocuaca
╎│•⟢.cogan
╎│•⟢.cecan
╎│•⟢.hacker
╎│•⟢.pubg
╎│•⟢.boneka
╎│•⟢.getname
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU PRIMBON* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.artinama
╎│•⟢.artimimpi
╎│•⟢.kecocokanpasangan
╎│•⟢.ramalancinta
╎│•⟢.kecocokannama
╎│•⟢.jadiannikah
╎│•⟢.sifatusaha
╎│•⟢.rezeki
╎│•⟢.pekerjaan
╎│•⟢.nasib
╎│•⟢.penyakit
╎│•⟢.artitarot
╎│•⟢.fengshui
╎│•⟢.haribaik
╎│•⟢.harisangar
╎│•⟢.harisial
╎│•⟢.harinaga
╎│•⟢.peruntungan
╎│•⟢.weton
╎│•⟢.karakter
╎│•⟢.masasubur
╎│•⟢.zodiak
╎│•⟢.wangy
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU GAME* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.susunkata
╎│•⟢.tebaklirik
╎│•⟢.siapaaku
╎│•⟢.tekateki
╎│•⟢.tebakkata
╎│•⟢.tebaktebakan
╎│•⟢.suit
╎│•⟢.tictactoe
╎│•⟢.deltictactoe
╎│•⟢.family100
╎│•⟢.caklontong
╎│•⟢.tebakbendera
╎│•⟢.buyglimit
╎│•⟢.tf
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU STORAGE* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.addvn
╎│•⟢.delvn
╎│•⟢.listvn
╎│•⟢.addstik
╎│•⟢.delstik
╎│•⟢.liststik
╎│•⟢.addrespon
╎│•⟢.delrespon
╎│•⟢.listrespon
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU SETTING* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.delsampah
╎│•⟢.delsesi
╎│•⟢.restart
╎│•⟢.public
╎│•⟢.self
╎│•⟢.setppbot
╎│•⟢.setnamebot
╎│•⟢.setbio
╎│•⟢.sethumb
╎│•⟢.setimgquoted
╎│•⟢.setgif
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
❍┈┈「 *MENU OWNER* 」
╎╭୧⍤⃝───────────┈◦•◦❥•◦
╎│•⟢.addsewa
╎│•⟢.ceksewa
╎│•⟢.sendpol
╎│•⟢.joincall
╎│•⟢.addprem
╎│•⟢.cekprem
╎│•⟢.listprem
╎│•⟢.delprem
╎│•⟢.adderror
╎│•⟢.delerror
╎│•⟢.listerror
╎│•⟢.clearallerror
╎│•⟢.blockcmd
╎│•⟢.listblockcmd
╎│•⟢.unblockcmd
╎│•⟢.block
╎│•⟢.unblock
╎│•⟢.listblock
╎│•⟢.ban
╎│•⟢.unban
╎│•⟢.listban
╎│•⟢.clearallban
╎│•⟢.out
╎│•⟢.join
╎│•⟢.listgc
╎│•⟢.listpc
╎│•⟢.getcase
╎│•⟢.clearalluser
╎│•⟢.resetlimit
╎│•⟢.getfile
╎│•⟢.backup
╎│•⟢.addcmdowner
╎│•⟢.delcmdowner
╎│•⟢.listcmdowner
╎│•⟢.addcmdprem
╎│•⟢.delcmdprem
╎│•⟢.listcmdprem
╎│•⟢.addcmdlimit
╎│•⟢.delcmdlimit
╎│•⟢.listcmdlimit
╎│•⟢.unmute
╎│•⟢.mute
╎│•⟢.bc
╎│•⟢.bcmem
╎│•⟢.bcgc
╎│•⟢.crashgc
╎│•⟢.call
╎│•⟢.$
╎│•⟢.>
╎꒰⚘݄꒱₊___________________˓˓ ⍥⃝⃝ ˒˒
❍┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈◙
༝༚ Bot Dalam Masa Pengembangan ༝༚
`
}
  



let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
	delete require.cache[file]
	require(file)
})
