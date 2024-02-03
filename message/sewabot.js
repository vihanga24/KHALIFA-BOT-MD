// SEWA BOT

exports.dada = (prefix, pushname, ucapanWaktu) => {
return `${ucapanWaktu} kak ${pushname}
Berikut adalah list harga untuk sewa bot

     「  *𝘚𝘦𝘸𝘢 𝘎𝘳𝘰𝘶𝘱* 」
> Pengguna baru Rp. 10k
> Masa aktif 15 Hari
> Free Givesaldo + Givelimit
> Free Premium Semua Admin

     「  *𝘚𝘦𝘸𝘢 𝘎𝘳𝘰𝘶𝘱 2* 」
> Pengguna baru Rp. 10k
> Masa aktif 1 Bulan
> Perpanjang Rp. 5k
> Free Givesaldo + Givelimit
> Free Premium Semua Admin

     「  *𝘉𝘶𝘺 𝘗𝘳𝘦𝘮* 」
> Pengguna baru Rp. 10k
> Masa aktif  1 Bulan


*BENEFITS*
> Bot on 24 jam
> Limit tanpa batas 
> Menu nsfw Terbuka
> Klaim lebih banyak EXP Harian
> Hidetag, mentionAll member
> Bisa mengubah watermark stiker`
}

const fs = require("fs");
const { color } = require("../lib/color");
const chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})

    




















