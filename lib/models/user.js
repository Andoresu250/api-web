"user strict"
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true }},
  email: { type: String, required: true, index: { unique: true }},
  password: { type: String, required: true},
  permissions_level: {type: Number, required: true},
  activated: {type: Boolean, required: true},
  _organization: { type: String, ref: 'Organization'}
})

module.exports = mongoose.model('User', UserSchema)
