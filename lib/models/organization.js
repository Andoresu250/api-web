"user strict"
const mongoose = require('mongoose')
    , Schema = mongoose.Schema


const OrganizationSchema = new mongoose.Schema({
  user : {type: Schema.Types.ObjectId, ref: 'User'},
  _advanced_form : { type: String, ref: 'AdvancedForm' },
  name: { type: String, required: true, index: { unique: true }},
  organization_type: { type: String, required: true},
  city: { type: String, required: true},
  is_juridical: {type: Boolean, required: true}
})

module.exports = mongoose.model('Organization', OrganizationSchema)
