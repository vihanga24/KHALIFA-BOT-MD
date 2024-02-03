const fs = require('fs');

global.addResponList = function(key, response, isImage, image_url, _db) {
var obj_add = {
key: key,
response: response,
isImage: isImage,
image_url: image_url
}
_db.push(obj_add)
}

global.getDataResponList = function(key, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].key === key) {
position = x
}
})
if (position !== null) {
return _db[position]
}
}

global.isAlreadyResponList = function(key, _db) {
let found = false
Object.keys(_db).forEach((x) => {
if (_db[x].key === key) {
found = true
}
})
return found
}

global.sendResponList = function(key, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].key === key) {
position = x
}
})
if (position !== null) {
return _db[position].response
}
}

global.delResponList = function(key, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].key === key) {
position = x
}
})

if (position !== null) {
_db.splice(position, 1)
}
}

global.updateResponList = function(key, response, isImage, image_url, _db) {
let position = null
Object.keys(_db).forEach((x) => {
if (_db[x].key === key) {
position = x
}
})
if (position !== null) {
_db[position].response = response
_db[position].isImage = isImage
_db[position].image_url = image_url
}
}