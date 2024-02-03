const {
  default: makeWASocket,
  makeWALegacySocket,
  extractMessageContent,
  makeInMemoryStore,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  getBinaryNodeChild,
  jidDecode,
  areJidsSameUser,
  generateWAMessage,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  WAMessageStubType,
  getContentType,
  relayMessage,
  WA_DEFAULT_EPHEMERAL
} = require('@whiskeysockets/baileys')
//const chalk = require('chalk')
const { color} = require("./color");
const fetch = require('node-fetch')
const FileType = require ('file-type')
const { Boom } = require('@hapi/boom')
const PhoneNumber = require('awesome-phonenumber')
const fs = require('fs')
const { Sticker, StickerTypes } = require('wa-sticker-formatter')
const pino = require('pino') 
const path = require('path')
const { getBuffer,sleep, smsg} = require("./myfunc");
const store = makeInMemoryStore({ logger: pino().child({ level: 'fatal', stream: 'store' }) })
const delay = ms => (ms) && new Promise(resolve => setTimeout(resolve, ms))

exports.makeWASocket = (connectionOptions, options = {}) => {
const alice = (baileysMd ? makeWASocket : makeWALegacySocket)(connectionOptions)


const buffer = async (path) => {
let result = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? {url: path} : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return result
}
const getRandomFile = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}



alice.sendImageAsSticker = async (jid, media, t, options = {}) => {
let jancok = new Sticker(media, {
pack: "Rangel°᭄ᴮᵒᵗ", // The pack name
author: "Created By єнz", // The author name
type: StickerTypes.FULL, // The sticker type
categories: ['🤩', '🎉'], // The sticker category
id: '12345', // The sticker id
quality: 50, // The quality of the output file
background: '#FFFFFF00' // The sticker background color (only for full stickers)
})
let stok = getRandomFile(".webp")
  let nono = await jancok.toFile(stok)
  let nah = fs.readFileSync(nono)
  await alice.sendMessage(jid, { contextInfo: { externalAdReply: { showAdAttribution: true,
  title: 'нσѕнιησ вσт',body: 'Created By єнz',previewType:"PHOTO",thumbnail: fs.readFileSync('./stik/thumb.jpeg'),
  sourceUrl:'https://chat.whatsapp.com/HDKp495Qf3D9blYtUufozD'																																
  }}, sticker: nah }, { quoted: t})   				
  return await fs.unlinkSync(stok)
  }
//LOAD MESSAGES
alice.loadMessage = (messageID) => {
return Object.entries(alice.chats)
.filter(([_, { messages }]) => typeof messages === 'object')
.find(([_, { messages }]) => Object.entries(messages)
.find(([k, v]) => (k === messageID || v.key?.id === messageID)))
?.[1].messages?.[messageID]
}

// ANTI CALL + AUTO BLOCK
  //
  /*
alice.ws.on('CB:call', async (json) => {
require('../message/anticall')(json,alice)
})
*/  
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

//SETTING
alice.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}
if (alice.user && alice.user.id) alice.user.jid = alice.decodeJid(alice.user.id)
alice.chats = {}
alice.contacts = {}


  
 alice.sendPoll = async (chatId, name, values, options = {}) => {
        let selectableCount = options?.selectableCount ? options.selectableCount : 1
        let messageSecret = options?.messageSecret ? options.messageSecret : ''
        return await alice.sendMessage(chatId, {
           poll: {
                name,
                values,
                selectableCount,
                messageSecret
            },
            ...options
        }, { ...options })
 } 

/**
 * sendMessage v2
 * @param {String} chatId
 * @param {import('@whiskeysockets/baileys').AnyMessageContent} message
 * @param {import('@whiskeysockets/baileys').MiscMessageGenerationOptions} options
 * @returns
 */


alice.sendMessageV2 = async (chatId, message, options = {}) => {
let generate = await generateWAMessage(chatId, message, options)
let type2 = getContentType(generate.message)
if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
return await alice.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}

  /**
   * getBuffer hehe
   * @param {String|Buffer} path
   * @param {Boolean} returnFilename
   */
alice.getFile = async (PATH, returnAsFilename) => {
let res, filename
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'
}
if (data && returnAsFilename && !filename) (filename = path.join(__dirname, new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
return {
res,
filename,
...type,
data
}
}



  /**
   * waitEvent
   * @param {*} eventName 
   * @param {Boolean} is 
   * @param {Number} maxTries 
   * @returns 
   */
  alice.waitEvent = (eventName, is = () => true, maxTries = 25) => {
      return new Promise((resolve, reject) => {
          let tries = 0
          let on = (...args) => {
              if (++tries > maxTries) reject('Max tries reached')
              else if (is()) {
                  alice.ev.off(eventName, on)
                  resolve(...args)
              }
          }
          alice.ev.on(eventName, on)
      })
  }

  /**
  * Send Media All Type 
  * @param {String} jid
  * @param {String|Buffer} path
  * @param {Object} quoted
  * @param {Object} options 
  */
  alice.sendMedia = async (jid, path, quoted, options = {}) => {
      let { ext, mime, data } = await alice.getFile(path)
      messageType = mime.split("/")[0]
      pase = messageType.replace('application', 'document') || messageType
      return await alice.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
  }




 
  /**
 * Send Contact
 * @param {String} jid 
 * @param {String} number 
 * @param {String} name 
 * @param {Object} quoted 
 * @param {Object} options 
 */

  alice.sendContactV2 = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await alice.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await alice.getName(i + '@s.whatsapp.net')}\nFN:${await alice.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${global.email}\nitem2.X-ABLabel:📧 Email\nitem3.URL:${global.instagram}\nitem3.X-ABLabel:📍 Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	alice.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
  }

  
  alice.sendContact = async (jid, number, name, quoted, options) => {
      let njid = number.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net` 
      let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
END:VCARD
  `
      return await alice.sendMessage(jid, {
          contacts: {
              displayName: `${name}`,
              contacts: [{ vcard }],
              ...options
          }
      },
      {
           quoted,
           ...options
      })
  }

  /**
   * Send Contact Array
   * @param {String} jid 
   * @param {String} number 
   * @param {String} name 
   * @param {Object} quoted 
   * @param {Object} options 
   */
  alice.sendContactArray = async (jid, data, quoted, options) => {
      let contacts = []
      for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
          number = number.replace(/[^0-9]/g, '')
          let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET: rangelchan57@gmail.com
item2.X-ABLabel:📧 Email
item3.ADR:;; Tasikmalaya;;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:https://ehanzdhoanx.my.id
item4.X-ABLabel:Website
item5.X-ABLabel:Rangel Bot By Ehanz 
END:VCARD`.trim()
          contacts.push({ vcard, displayName: name })

      }
      return await alice.sendMessage(jid, {
          contacts: {
              displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
              contacts,
          }
      },
      {
           quoted,
           ...options
      })
  }

  

/**
         * 
         * @param {*} jid 
         * @param {*} text 
         * @param {*} quoted 
         * @param {*} options 
         * @returns 
         */
alice.sendText = (jid, text, quoted = '', options) => alice.sendMessage(jid, { text: text, ...options }, { quoted })


  /**
   * Reply to a message
   * @param {String} jid
   * @param {String|Object} text
   * @param {Object} quoted
   * @param {Object} mentions [m.sender]
   */
  alice.reply = (jid, text = '', quoted, options) => {
      return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : alice.sendMessage(jid, { ...options, text }, { quoted, ...options })
  }
  
  
  
  
  /**
  * Send a list message
  * @param jid the id to send to
  * @param button the optional button text, title and description button
  * @param rows the rows of sections list message
  */
  alice.sendListM = (jid, button, rows, quoted, options = {}) => {
      const sections = [
          {
              title: button.title,
              rows: [...rows]
          }
      ]
      const listMessage = {
          text: button.description,
          footer: button.footerText,
          mentions: alice.parseMention(button.description, button.footerText),
          title: '',
          buttonText: button.buttonText,
          sections
      }
      alice.sendMessage(jid, listMessage, {
          quoted,
          ...options 
      })
  }

 
  

 
 
  
 
   
 
  /**
  * sendGroupV4Invite
  * @param {String} jid 
  * @param {*} participant 
  * @param {String} inviteCode 
  * @param {Number} inviteExpiration 
  * @param {String} groupName 
  * @param {String} caption 
  * @param {*} options 
  * @returns 
  */
  alice.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
      let msg = proto.Message.fromObject({
          groupInviteMessage: proto.GroupInviteMessage.fromObject({
              inviteCode,
              inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
              groupJid: jid,
              groupName: groupName ? groupName : this.getName(jid),
              caption
          })
      })
      let message = await this.prepareMessageFromContent(participant, msg, options)
      await this.relayWAMessage(message)
      return message
  }

  /**
  *Message
  */
alice.relayWAMessage = async (pesanfull) => {
var mekirim = await alice.relayMessage(pesanfull.key.remoteJid, pesanfull.message, { messageId: pesanfull.key.id })
alice.ev.emit('messages.upsert', { messages: [pesanfull], type: 'append' });
return mekirim
}

  /**
  * cMod
  * @param {String} jid 
  * @param {*} message 
  * @param {String} text 
  * @param {String} sender 
  * @param {*} options 
  * @returns 
  */
  alice.cMod = async (jid, message, text = '', sender = alice.user.jid, options = {}) => {
      if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
      let copy = message.toJSON()
      delete copy.message.messageContextInfo
      delete copy.message.senderKeyDistributionMessage
      let mtype = Object.keys(copy.message)[0]
      let msg = copy.message
      let content = msg[mtype]
      if (typeof content === 'string') msg[mtype] = text || content
      else if (content.caption) content.caption = text || content.caption
      else if (content.text) content.text = text || content.text
      if (typeof content !== 'string') {
          msg[mtype] = { ...content, ...options }
          msg[mtype].contextInfo = {
              ...(content.contextInfo || {}),
              mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
          }
      }
      if (copy.participant) sender = copy.participant = sender || copy.participant
      else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
      if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
      else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
      copy.key.remoteJid = jid
      copy.key.fromMe = areJidsSameUser(sender, alice.user.id) || false
      return proto.WebMessageInfo.fromObject(copy)
  }
  
  
  
  
  
  
  
  /**
   * Exact Copy Forward
   * @param {String} jid
   * @param {Object} message
   * @param {Boolean|Number} forwardingScore
   * @param {Object} options
   */
alice.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
let m = generateForwardMessageContent(message, !!forwardingScore)
let mtype = Object.keys(m)[0]
if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
m = generateWAMessageFromContent(jid, m, { ...options, userJid: alice.user.id })
await alice.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options }})
return m
}
  
  
     
  
  
  /**
   * Download media message
   * @param {Object} m
   * @param {String} type 
   * @param {fs.PathLike|fs.promises.FileHandle} filename
   * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
   */
  alice.downloadM = async (m, type, filename = '') => {
      if (!m || !(m.url || m.directPath)) return Buffer.alloc(0)
      const stream = await downloadContentFromMessage(m, type)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      if (filename) await fs.promises.writeFile(filename, buffer)
      return filename && fs.existsSync(filename) ? filename : buffer
  }
  
  alice.downloadMed = async (message, filename, attachExtension = true) => {
      let mime = (message.msg || message).mimetype || ''
      let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
      const stream = await downloadContentFromMessage(message, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk])
      }
      let type = await FileType.fromBuffer(buffer)
      trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
      //trueFileName = attachExtension ? filename : filename
      // save to file
      await fs.writeFileSync(trueFileName, buffer)
      return trueFileName
  }
 

  /**
   * Parses string into mentionedJid(s)
   * @param {String} text
   */
  alice.parseMention = (text = '') => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
  }
  
  
  alice.saveName = async (id, name = '') => {
      if (!id) return
      id = alice.decodeJid(id)
      let isGroup = id.endsWith('@g.us')
      if (id in alice.contacts && alice.contacts[id][isGroup ? 'subject' : 'name'] && id in alice.chats) return
      let metadata = {}
      if (isGroup) metadata = await alice.groupMetadata(id)
      let chat = { ...(alice.contacts[id] || {}), id, ...(isGroup ? { subject: metadata.subject, desc: metadata.desc } : { name }) }
      alice.contacts[id] = chat
      alice.chats[id] = chat
  }

/**
* Get name from jid
* @param {String} jid
* @param {Boolean} withoutContact
*/
alice.getName = async (jid = '', withoutContact = false) => {
jid = alice.decodeJid(jid)
withoutContact = alice.withoutContact || withoutContact
let v
if (jid.endsWith('@g.us')) return new Promise(async (resolve) => {
v = alice.chats[jid] || {}
if (!(v.name || v.subject)) v = await alice.groupMetadata(jid) || {}
resolve(v.name || v.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = jid === '0@s.whatsapp.net' ? {
jid,
vname: 'WhatsApp'
} : areJidsSameUser(jid, alice.user.id) ?
alice.user :
(alice.chats[jid] || {})
return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), "")
}


  
  
  
  
  
  
  alice.processMessageStubType = async(m) => {
  /**
   * to process MessageStubType
   * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo} m 
   */
  if (!m.messageStubType) return
      const chat = alice.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
  if (!chat || chat === 'status@broadcast') return
      const emitGroupUpdate = (update) => {
          ev.emit('groups.update', [{ id: chat, ...update }])
      }
      switch (m.messageStubType) {
          case WAMessageStubType.REVOKE:
          case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
          emitGroupUpdate({ revoke: m.messageStubParameters[0] })
          break
          case WAMessageStubType.GROUP_CHANGE_ICON:
          emitGroupUpdate({ icon: m.messageStubParameters[0] })
          break
          default: {
              console.log({
                  messageStubType: m.messageStubType,
                  messageStubParameters: m.messageStubParameters,
                  type: WAMessageStubType[m.messageStubType]
              })
              break
          }
      }
      const isGroup = chat.endsWith('@g.us')
      if (!isGroup) return
      let chats = alice.chats[chat]
      if (!chats) chats = alice.chats[chat] = { id: chat }
      chats.isChats = true
      const metadata = await alice.groupMetadata(chat).catch(_ => null)
      if (!metadata) return
      chats.subject = metadata.subject
      chats.metadata = metadata
  }
  alice.insertAllGroup = async() => {
      const groups = await alice.groupFetchAllParticipating().catch(_ => null) || {}
      for (const group in groups) alice.chats[group] = { ...(alice.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
          return alice.chats
  }
  
 
  
  alice.pushMessage = async(m) => {
  /**
   * pushMessage
   * @param {import('@whiskeysockets/baileys').proto.WebMessageInfo[]} m 
   */
  if (!m) return
      if (!Array.isArray(m)) m = [m]
          for (const message of m) {
              try {
              // if (!(message instanceof proto.WebMessageInfo)) continue // https://github.com/whiskeysockets/Baileys/pull/696/commits/6a2cb5a4139d8eb0a75c4c4ea7ed52adc0aec20f
              if (!message) continue
                  if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) alice.processMessageStubType(message).catch(console.error)
                      const _mtype = Object.keys(message.message || {})
                  const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                  (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                  _mtype[_mtype.length - 1]
                  const chat = alice.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
                  if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
                  /**
                   * @type {import('@whiskeysockets/baileys').proto.IContextInfo}
                   */
                  let context = message.message[mtype].contextInfo
                  let participant = alice.decodeJid(context.participant)
                  const remoteJid = alice.decodeJid(context.remoteJid || participant)
                  /**
                   * @type {import('@whiskeysockets/baileys').proto.IMessage}
                   * 
                   */
                  let quoted = message.message[mtype].contextInfo.quotedMessage
                  if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                      let qMtype = Object.keys(quoted)[0]
                      if (qMtype == 'conversation') {
                          quoted.extendedTextMessage = { text: quoted[qMtype] }
                          delete quoted.conversation
                          qMtype = 'extendedTextMessage'
                      }

                      if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
                      quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
                      const isGroup = remoteJid.endsWith('g.us')
                      if (isGroup && !participant) participant = remoteJid
                          const qM = {
                              key: {
                                  remoteJid,
                                  fromMe: areJidsSameUser(alice.user.jid, remoteJid),
                                  id: context.stanzaId,
                                  participant,
                              },
                              message: JSON.parse(JSON.stringify(quoted)),
                              ...(isGroup ? { participant } : {})
                          }
                          let qChats = alice.chats[participant]
                          if (!qChats) qChats = alice.chats[participant] = { id: participant, isChats: !isGroup }
                              if (!qChats.messages) qChats.messages = {}
                                  if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
                                      let qChatsMessages
                                      if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length)) // maybe avoid memory leak
                                  }
                          }
                          if (!chat || chat === 'status@broadcast') continue
                              const isGroup = chat.endsWith('@g.us')
                          let chats = alice.chats[chat]
                          if (!chats) {
                              if (isGroup) await alice.insertAllGroup().catch(console.error)
                                  chats = alice.chats[chat] = { id: chat, isChats: true, ...(alice.chats[chat] || {}) }
                          }
                          let metadata, sender
                          if (isGroup) {
                              if (!chats.subject || !chats.metadata) {
                                  metadata = await alice.groupMetadata(chat).catch(_ => ({})) || {}
                                  if (!chats.subject) chats.subject = metadata.subject || ''
                                  if (!chats.metadata) chats.metadata = metadata
                              }
                          sender = alice.decodeJid(message.key?.fromMe && alice.user.id || message.participant || message.key?.participant || chat || '')
                          if (sender !== chat) {
                              let chats = alice.chats[sender]
                              if (!chats) chats = alice.chats[sender] = { id: sender }
                              if (!chats.name) chats.name = message.pushName || chats.name || ''
                          }
                  } else if (!chats.name) chats.name = message.pushName || chats.name || ''
                  if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
                      chats.isChats = true
                  if (!chats.messages) chats.messages = {}
                      const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, alice.user.id)
                  if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
                      delete message.message.messageContextInfo
                      delete message.message.senderKeyDistributionMessage
                      chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
                      let chatsMessages
                      if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
                  }
          } catch (e) {
              console.error(e)
          }
      }
  }
  
  alice.getBusinessProfile = async (jid) => {
      const results = await alice.query({
          tag: 'iq',
          attrs: {
              to: 's.whatsapp.net',
              xmlns: 'w:biz',
              type: 'get'
          },
          content: [{
              tag: 'business_profile',
              attrs: { v: '244' },
              content: [{
                  tag: 'profile',
                  attrs: { jid }
              }]
          }]
      })
      const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile')
      if (!profiles) return {} // if not bussines
      const address = getBinaryNodeChild(profiles, 'address')
      const description = getBinaryNodeChild(profiles, 'description')
      const website = getBinaryNodeChild(profiles, 'website')
      const email = getBinaryNodeChild(profiles, 'email')
      const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category')
      return {
          jid: profiles.attrs?.jid,
          address: address?.content.toString(),
          description: description?.content.toString(),
          website: website?.content.toString(),
          email: email?.content.toString(),
          category: category?.content.toString(),
      }
  }
  
  /**
* ms to date
* @param {String} ms
*/
alice.msToDate = (ms) => {
let days = Math.floor(ms / (24 * 60 * 60 * 1000))
let daysms = ms % (24 * 60 * 60 * 1000)
let hours = Math.floor((daysms) / (60 * 60 * 1000))
let hoursms = ms % (60 * 60 * 1000)
let minutes = Math.floor((hoursms) / (60 * 1000))
let minutesms = ms % (60 * 1000)
let sec = Math.floor((minutesms) / (1000))
return days + " Hari " + hours + " Jam " + minutes + " Menit"
}

/**
*
* @param {Number} ms
* @returns
*/
alice.msToTime = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

/**
*
* @param {Number} ms
* @returns
*/
alice.msToHour = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
return [h + ' Jam '].map(v => v.toString().padStart(2, 0)).join(' ')
}
alice.msToMinute = (ms) => {
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
return [m + ' Menit '].map(v => v.toString().padStart(2, 0)).join(' ')
}
alice.msToSecond = (ms) => {
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}

/**
*
* @param {Number} ms
* @returns
*/
alice.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h + ' Jam ', m + ' Menit ', s + ' Detik'].map(v => v.toString().padStart(2, 0)).join(' ')
}



  /**
   * 
   * @param {String} text 
   * @returns 
   */
alice.filter = (text) => {
let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
else {
let res = Array.from(text).filter(v => mati.includes(v))
let resu = res[res.length - 1]
for (let huruf of mati) {
if (text.endsWith(huruf)) {
resu = res[res.length - 2]
}
}
let misah = text.split(resu)
return resu + misah[misah.length - 1]
}
}

  
  
  /**
   * Serialize Message, so it easier to manipulate
   * @param {Object} m
   */
alice.serializeM = (m) => {
return exports.smsg(alice, m)
}

   /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} caption 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
alice.sendImage = async (jid, path, caption = '', setquoted, options) => {
let buffer = Buffer.isBuffer(path) ? path : await getBuffer(path)
return await alice.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted: setquoted})
}
  
   /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} caption 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
alice.sendVideo = async (jid, yo, caption = '', quoted = '', gif = false, options) => {
//let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await alice.sendMessage(jid, { video: yo, caption: caption, gifPlayback: gif, ...options }, {quoted })
}
  
  
  /**
       * 
       * @param {*} jid 
       * @param {*} path 
       * @param {*} quoted 
       * @param {*} mime 
       * @param {*} options 
       * @returns 
       */
alice.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
  return await alice.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
  }
  
  /**
   * 
   * @param {*} jid 
   * @param {*} text 
   * @param {*} quoted 
   * @param {*} options 
   * @returns 
   */
alice.sendTextWithMentions = async (jid, text, quoted, options = {}) => alice.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
  
      
  /**
   * 
   * @param {*} jid 
   * @param {*} path 
   * @param {*} quoted 
   * @param {*} options 
   * @returns 
   */
alice.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await alice.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}
  
  
  
  
  
  
  
  /**
   * send group invitation via message
   * @param {string} jid gorupJid 
   * @param {string} participant this message sent to?
   * @param {string} inviteCode group invite code
   * @param {Number} inviteExpiration invite expiration
   * @param {string} groupName group name
   * @param {string} jpegThumbnail file path or url
   * @param {string} caption message caption
   * @param {any} options message options
   */
alice.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
let msg = WAProto.Message.fromObject({
groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
inviteCode,
inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
groupJid: jid,
groupName: groupName ? groupName : (await alice.groupMetadata(jid)).subject,
jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
caption
})
})
const m = generateWAMessageFromContent(participant, msg, options)
return await alice.relayMessage(participant, m.message, { messageId: m.key.id })
}


alice.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
 let message = await prepareWAMessageMedia({ image: gam    }, { upload: alice.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "IDR",
"priceAmount1000": "100000",
"url": `https://www.youtube.com/watch?v=TOmXzkWuCWk`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${nomerOwner}@s.whatsapp.net`
}
}, options)
return alice.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 


//SEND 1 KONTAK
alice.sendKontak = (jid, nomor, nama, org = "", quoted = '', opts = {} ) => {
const vcard ="BEGIN:VCARD\n" 
+"VERSION:3.0\n" 
+ "FN:" +nama +"\n"
+"ORG:" + org + "\n" 
+"TEL;type=CELL;type=VOICE;waid=" +nomor + ":+" +nomor +"\n" 
+"item1.X-ABLabel:Ponsel\n"
+"item2.EMAIL;type=INTERNET:takimtod@gmail.com\n"
+"item2.X-ABLabel:Email\nitem3.URL:https://instagram.com/zyee_ez\n"
+"item3.X-ABLabel:Instagram\n"
+"item4.ADR:;;Indonesia;;;;\n"
+"item4.X-ABLabel:Region\n"
+"END:VCARD"
alice.sendMessage(jid,{contacts: {displayName: nama, contacts: [{ vcard }] }, ...opts},{quoted})
};
  
  
/**
* 
* @param {*} message 
* @param {*} filename 
* @param {*} attachExtension 
* @returns 
*/
alice.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)

let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
// save to file
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}
  
alice.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.type ? message.type.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
} 
  
  
  //Button Image ✓
  alice.sendButImage = async(id, text1, desc1, gam1, but = [], options1 = {}) => {
  let buttonMessage = {
  image: await buffer(gam1),
  caption: text1,
  footer: desc1,
  buttons: but,
  headerType: 4
  }
  return await alice.sendMessage(id, buttonMessage, options1)
  }

//Template Button Image 2 ✓
  alice.send5ButImg = async(id, text1, desc1, gam1, but = [], options1 = {}) => {
  let buttonMessage = {
  image: await buffer(gam1),
  caption: text1,
  footer: desc1,
  templateButtons: but,
  headerType: 4
  }
  
  return await alice.sendMessage(id, buttonMessage, options1)               
  }


  //Button 5 Loc ✓
  alice.send5ButLoc = async(id, text1, desc1, gam1, but = [],options1 = {}) => {
  let buttonMessage = {
  location: { jpegThumbnail: await buffer(gam1) } ,
  caption: text1,
  footer: desc1,
  viewOnce: true,
  templateButtons: but,
  headerType: "LOCATION"
  }
  return await alice.sendMessage(id, buttonMessage, options1)
    }
  
  //Button Loc ✓
  alice.sendButLoc = async(id, text1, desc1, gam1, but = [], options1 = {}) => {
  let buttonMessage = {
  location: { jpegThumbnail: await buffer(gam1) } ,
  caption: text1,
  footer: desc1,
  buttons: but,
  headerType: "LOCATION"
  }
  return await alice.sendMessage(id, buttonMessage, options1)
  }
  

  
  //Button Text ✓
  alice.sendButMessage = async (id, text1, desc1, but = [], options  ) => {
  let buttonMessage = {
  text: text1,
  footer: desc1,
  buttons: but,
  headerType: 1
  }
  return alice.sendMessage(id, buttonMessage,{quoted: options})
  }


  //Template Button 5 Text ✓
  alice.send5ButMessage = async (id, text1, desc1, but = [], options  ) => {
  let buttonMessage = {
  text: text1,
  footer: desc1,
  templateButtons: but,
  headerType: 1
  }
  return alice.sendMessage(id, buttonMessage,{quoted: options})
  }
  
  //Button Gif ✓
  alice.send5ButGif = async (id, text1, desc1, gam1, but = [],gam, options = {}) => {
   let buff = /^https?:\/\//.test(gam) ? await getBuffer(gam) : gam
  let buttonMessage = {
  video: await buffer(gam1),
  caption: text1,
  footer: desc1,
  templateButtons: but,
  gifPlayback: true,
  jpegThumbnail: buff, 
  fileLength : 99, 
  headerType: 'VIDEO'
  }
  return await alice.sendMessage(id, buttonMessage, options)
  }
  
  //Button Image ✓
  alice.sendButGif = async(id, text1, desc1, gam1, but = [], gam,options1 = {}) => {
  let buff = /^https?:\/\//.test(gam) ? await getBuffer(gam) : gam
  let buttonMessage = {
  video: await buffer(gam1),
  caption: text1,
  footer: desc1,
  buttons: but,
  gifPlayback: true,
  jpegThumbnail: buff, 
  fileLength : 99, 
  headerType: 'VIDEO'
  }
  return await alice.sendMessage(id, buttonMessage, options1)
  }
  
  
 
  //Button document ✓
  alice.sendButDoc = async(id, text1, desc1, gam1, but = [], options,  options1 = {}) => {	
  let buff = /^https?:\/\//.test(gam1) ? await getBuffer(gam1) : gam1
  if(docType === "pptx"){
  var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  } else if(docType === "xlsx"){
  var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  } else if(docType === "zip"){
  var AppType = "application/zip"
  } else if(docType === "pdf"){
  var AppType = "application/pdf"
  } else if(docType === "docx"){
  var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  } 
  const buttonMessage = {
  contextInfo: options,
  document:{ url: "https://wa.me/94714201875" },
  mimetype: AppType, 
  title : "Footer text", 
  fileLength : 99999, 
  pageCount: 1, 
  fileName : "Bot WhatsApp", 
  caption: text1,
  footer: desc1,
  buttons: but,
  headerType: "DOCUMENT",
  jpegThumbnail: buff
  }
  
  return alice.sendMessage(id, buttonMessage,options1)
  } 


  alice.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
 let type = await alice.getFile(path, true)
 let { res, data: file, filename: pathFile } = type
 if (res && res.status !== 200 || file.length <= 65536) {
 try { throw { json: JSON.parse(file.toString()) } }
 catch (e) { if (e.json) throw e.json }
 }
let opt = { filename }
if (quoted) opt.quoted = quoted
if (!type) if (options.asDocument) options.asDocument = true
let mtype = '', mimetype = type.mime
if (/webp/.test(type.mime)) mtype = 'sticker'
else if (/image/.test(type.mime)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime)) (
//convert = await (ptt ? toPTT : toAudio)(file, type.ext),
//file = convert.data,
//pathFile = convert.filename,
mtype = 'audio',
mimetype = 'audio/ogg; codecs=opus'
 )
else mtype = 'document'
 await alice.sendMessage(jid, {
...options,
caption,
ptt,
[mtype]: { url: pathFile },
mimetype
}, {
...opt,
...options
})
return fs.unlinkSync(pathFile)
}

  
  //Button document ✓
  alice.send5ButDoc = async(id, text1, desc1, gam1, but = [], options,  options1 = {}) => {	
   let buff = /^https?:\/\//.test(gam1) ? await getBuffer(gam1) : gam1
  if(docType === "pptx"){
  var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  } else if(docType === "xlsx"){
  var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  } else if(docType === "zip"){
  var AppType = "application/zip"
  } else if(docType === "pdf"){
  var AppType = "application/pdf"
  } else if(docType === "docx"){
  var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  } 
  const buttonMessage = {
  contextInfo: options,
 document:{ url: "https://wa.me/94714201875" },
  mimetype: AppType, 
  title : "Footer text", 
  fileLength : 999999999999, 
  pageCount: 100, 
  fileName : "Extream", 
  caption: text1,
  footer: desc1,
  templateButtons: but,
  headerType: "DOCUMENT",
  jpegThumbnail: buff
  }
  
  return alice.sendMessage(id, buttonMessage,options1)
  } 
  
  


  
alice.sendPayment = async (jid, amount, currency, text = '', from, image, options) => {
const requestPaymentMessage = { amount: {
currencyCode: currency || 'USD',
offset: 0,
value: amount || 9.99
},
expiryTimestamp: 0,
amount1000: (amount || 9.99) * 1000,
currencyCodeIso4217: currency || 'USD',
requestFrom: from || '0@s.whatsapp.net',
noteMessage: {
extendedTextMessage: {
text: text || 'Example Payment Message'
}
},
background: !!image ? (await makeBackgroundRequestPayment(image, {
upload: alice.waUploadToServer
})) : undefined
};
return await alice.relayMessage(jid, { requestPaymentMessage }, { ...options });
}
      
/**
* Send a list message
* @param jid the id to send to
* @param button the optional button text, title and description button
* @param rows the rows of sections list message
*/
alice.sendListM = async (jid, button, rows, quoted, options = {}) => {
const sections = [
{
title: button.title,
rows: [...rows]
}
]
const listMessage = {
text: button.description,
footer: button.footerText,
mentions: await alice.parseMention(button.description),
ephemeralExpiration: global.ephemeral,
title: '',
buttonText:button.buttonText,
sections
}
alice.sendMessage(jid, listMessage, {
quoted,
contextInfo: {
forwardingScore: 999999,
isForwarded: true,
...options
}
})
} 
  
































  Object.defineProperty(alice, 'name', {
      value: { ...(options.chats || {}) },
      configurable: true,
  })
  if (alice.user?.id) alice.user.jid = alice.decodeJid(alice.user.id)
  //bind(alice)
  store.bind(alice.ev)
  return alice









//------------------------------[ BATAS KATULISTIWA ]----------------------------\\
}

/**
* Serialize Message
* @param {WAConnection} alice 
* @param {Object} m 
* @param {Boolean} hasParent 
*/ 
exports.smsg = (alice, m, hasParent) => {
if (!m) return m
let M = proto.WebMessageInfo
m = M.fromObject(m)
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id && m.id.length === 16 || m.id.startsWith('3EB0') && m.id.length === 12 || false
m.chat = alice.decodeJid(m.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
m.now = m.messageTimestamp
m.isGroup = m.chat.endsWith('@g.us')
m.sender = alice.decodeJid(m.key.fromMe && alice.user.id || m.participant || m.key.participant || m.chat || '')
m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, alice.user.id)
m.from  = m.key.remoteJid
m.groupMetadata = (m.isGroup ? (alice.chats[m.chat] || {}).metadata : {}) || {}
m.groupName =  (m.isGroup ? m.groupMetadata.subject : []) || []
m.groupId =  (m.isGroup ? m.groupMetadata.Jid : []) || []
m.groupMembers = (m.isGroup ? m.groupMetadata.participants : []) || []
m.groupDesc =  (m.isGroup ? m.groupMetadata.desc : []) || []
m.groupOwner =  (m.isGroup ? m.groupMetadata.owner : []) || []
const user = (m.isGroup ? m.groupMembers.find(u => alice.decodeJid(u.id) === m.sender) : {}) || {} // User Data
const bot = (m.isGroup ? m.groupMembers.find(u => alice.decodeJid(u.id) == alice.user.jid) : {}) || {} // Your Data
m.isRAdmin = user && user.admin == 'superadmin' || false
m.isAdmin = m.isRAdmin || user && user.admin == 'admin' || false 
m.isBotAdmin = bot && bot.admin == 'admin' || false // Are you Admin?  
}


  
if (m.message) {
let mtype = Object.keys(m.message)
m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || 
(mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || mtype[mtype.length - 1] 
m.type = getContentType(m.message)
m.content = JSON.stringify(m.message)
m.botNumber = alice.user.id ? alice.user.id.split(":")[0]+"@s.whatsapp.net" : alice.user.jid
m.senderNumber = m.sender.split("@")[0]
m.pushname = m.pushName || "No Name"
m.itsMe = m.sender == m.botNumber ? true : false
m.mentionByTag = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
m.mentionByReply = m.type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : "" 
m.users = m.mentionByReply? m.mentionByReply : m.mentionByTag[0]
m.budy = (m.type === 'conversation') ? m.message.conversation : (m.type === 'extendedTextMessage') ? m.message.extendedTextMessage.text : '' 
m.body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || dev.message.listResponseMessage?.singleSelectReply.selectedRowId ) : ''
m.args = m.body.trim().split(/ +/).slice(1) 
m.numberQuery = m.args.join(' ').replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
   

m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.type])
if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
if (m.mtype == 'protocolMessage' && m.msg.key) {
if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
m.msg.key.fromMe = alice.decodeJid(m.msg.key.participant) === alice.decodeJid(alice.user.id)
if (!m.msg.key.fromMe && m.msg.key.remoteJid === alice.decodeJid(alice.user.id)) m.msg.key.remoteJid = m.sender
}
  //m.msg.text || m.msg.caption || m.msg.contentText ||
m.text =   m.msg || ''
//m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
       
  /*
 if (typeof m.text !== 'string') {
            if ([
                'protocolMessage',
                'messageContextInfo',
                'stickerMessage',
                'audioMessage',
                'senderKeyDistributionMessage'
            ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }


*/
  
  m.mentionedJid = m.msg?.contextInfo?.mentionedJid?.length && m.msg.contextInfo.mentionedJid || []
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = alice.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
            m.quoted.isBaileys = m.quoted.id && m.quoted.id.length === 16 || false
            m.quoted.sender = alice.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === alice.user.jid
            
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''
            m.quoted.name = alice.getName(m.quoted.sender)
            m.quoted.mentionedJid = m.quoted.contextInfo?.mentionedJid?.length && m.quoted.contextInfo.mentionedJid || []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    fromMe: m.quoted.fromMe,
                    remoteJid: m.quoted.chat,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return null
                let q = M.fromObject(await alice.loadMessage(m.quoted.id) || vM)
                return exports.smsg(alice, q)
            }
            if (m.quoted.url || m.quoted.directPath) m.quoted.download = (saveToFile = false) => alice.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            
            /**
             * Reply to quoted message
             * @param {String|Object} text
             * @param {String|false} chatId
             * @param {Object} options
             */
            m.quoted.reply = (text, chatId, options) => alice.reply(chatId ? chatId : m.chat, text, vM, options)
            m.quoted.replys = (text, chatId, options) => alice.replys(chatId ? chatId : m.chat, text, vM, options)
            /**
             * Copy quoted message
             */
            m.quoted.copy = () => exports.smsg(alice, M.fromObject(M.toObject(vM)))

            /**
             * Forward Quoted Message
             * @param {String} jid
             * @param {Boolean} forceForward
             */
            m.quoted.forward = (jid, forceForward = false) => alice.forwardMessage(jid, vM, forceForward)

            /**
             * Exact Forward quoted message
             * @param {String} jid
             * @param {Boolean|Number} forceForward
             * @param {Object} options
            */
            m.quoted.copyNForward = (jid, forceForward = true, options = {}) => alice.copyNForward(jid, vM, forceForward, options)

            /**
             * Modify quoted Message
             * @param {String} jid
             * @param {String} tex
             * @param {String} sender
             * @param {Object} options
             */
            m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => alice.cMod(jid, vM, text, sender, options)

            /**
             * Delete quoted message
             */
            m.quoted.delete = () => alice.sendMessage(m.quoted.chat, { delete: vM.key })
        }
    }
    m.name = !nullish(m.pushName) && m.pushName || alice.getName(m.sender)
    if (m.msg && m.msg.url) m.download = (saveToFile = false) => alice.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
 
    /**
     * Reply to this message
     * @param {String|Object} text
     * @param {String|false} chatId
     * @param {Object} options
     */
    m.reply = (text, chatId, options) => alice.reply(chatId ? chatId : m.chat, text, m, options)
    m.replys = (text, chatId, options) => alice.replys(chatId ? chatId : m.chat, text, m, options)
    /**
     * Exact Forward this message
     * @param {String} jid
     * @param {Boolean} forceForward
     * @param {Object} options
     */
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => alice.copyNForward(jid, m, forceForward, options)
    /**
     * Modify this Message
     * @param {String} jid 
     * @param {String} text 
     * @param {String} sender 
     * @param {Object} options 
     */
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => alice.cMod(jid, m, text, sender, options)

    /**
     * Delete this message
     */
    m.delete = () => alice.sendMessage(m.chat, { delete: m.key })
    try {
        alice.saveName(m.sender, m.name)
        alice.pushMessage(m)
        if (m.isGroup) alice.saveName(m.chat)
        if (m.msg && m.mtype == 'protocolMessage') alice.ev.emit('message.delete', m.msg.key)
    } catch (e) {
        console.error(e)
    }
    return m
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.protoType = () => {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
        view[i] = this[i];
    }
    return ab;
  }
  /**
   * @returns {ArrayBuffer}
   */
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  /**
   * @returns {Buffer}
   */
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this))
  }
  // /**
  //  * @returns {String}
  //  */
  // Buffer.prototype.toUtilFormat = ArrayBuffer.prototype.toUtilFormat = Object.prototype.toUtilFormat = Array.prototype.toUtilFormat = function toUtilFormat() {
  //     return util.format(this)
  // }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this)
  }
  /**
   * @returns {Boolean}
   */
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  /**
   *
   * @returns {String}
   */
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
  }
  /**
   * @returns {String}
   */
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(' ')
    return str.map(v => v.capitalize()).join(' ')
  }
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {}
      return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
    } else return this.trim()
  }
  /**
   * number must be milliseconds
   * @returns {string}
   */
  Number.prototype.toTimeString = function toTimeString() {
    // const milliseconds = this % 1000
    const seconds = Math.floor((this / 1000) % 60)
    const minutes = Math.floor((this / (60 * 1000)) % 60)
    const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
    const days = Math.floor((this / (24 * 60 * 60 * 1000)))
    return (
      (days ? `${days} day(s) ` : '') +
      (hours ? `${hours} hour(s) ` : '') +
      (minutes ? `${minutes} minute(s) ` : '') +
      (seconds ? `${seconds} second(s)` : '')
    ).trim()
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
  return Math.floor(Math.random() * this)
}

/**
 * ??
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
 * @returns {boolean}
 */
function nullish(args) {
  return !(args !== null && args !== undefined)
}



