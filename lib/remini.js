'use strict'
var FormData = require('form-data')
var Jimp = require('jimp')
async function remini(store, name) {
  return new Promise(async function (_$$mdAnimate_, negater) {
    var exports = ['enhance', 'recolor', 'dehaze']
    if (exports.includes(name)) {
      name = name
    } else {
      name = exports[0]
    }
    var _0x236d30 = void 0
    var data = new FormData()
    var requestOrUrl = 'https://inferenceengine.vyro.ai/' + name
    data.append('model_version', 1, {
      'Content-Transfer-Encoding': 'binary',
      contentType: 'multipart/form-data; charset=uttf-8',
    })
    data.append('image', Buffer.from(store), {
      filename: 'enhance_image_body.jpg',
      contentType: 'image/jpeg',
    })
    data.submit(
      {
        url: requestOrUrl,
        host: 'inferenceengine.vyro.ai',
        path: '/' + name,
        protocol: 'https:',
        headers: {
          'User-Agent': 'okhttp/4.9.3',
          Connection: 'Keep-Alive',
          'Accept-Encoding': 'gzip',
        },
      },
      function (canCreateDiscussions, messages) {
        if (canCreateDiscussions) {
          negater()
        }
        var upcast = []
        messages
          .on('data', function (element, canCreateDiscussions) {
            upcast.push(element)
          })
          .on('end', function () {
            _$$mdAnimate_(Buffer.concat(upcast))
          })
        messages.on('error', function (canCreateDiscussions) {
          negater()
        })
      }
    )
  })
}
module.exports = {remini}