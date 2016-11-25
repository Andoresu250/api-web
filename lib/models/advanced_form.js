"user strict"
const mongoose = require('mongoose')
    , Schema = mongoose.Schema


const AdvancedFormSchema = new mongoose.Schema({
  organization : {type: Schema.Types.ObjectId, ref: 'Organization'},
  patrimonial_conservation: { type: String, required: true },
  history: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String, required: true },
  frequency: { type: String, required: true },
  media: [{ type: String, required: true }],
  have_structure: { type: Boolean, required: true },
  team:{
    members: [{ type: String, required: true }],
    committee_frequency: { type: String, required: true },
    members_number:{
      total: { type: Number, required: true },
      linked: { type: Number, required: true },
      volunteers: { type: Number, required: true },
      provision_of_services: { type: Number, required: true }
    }
  },
  study_schooling:{
    masters_degree: { type: Number, required: true },
    academic: { type: Number, required: true },
    technical_technologist: { type: Number, required: true },
    high_school: { type: Number, required: true },
    primary: { type: Number, required: true },
    none: { type: Number, required: true }
  },
  financing: [{
    financing_type: { type: String, required: true },
    percentage: {type: Number, required: true}
  }],
  number_of_projects:{
    last_two_years: { type: Number, required: true },
    currently: { type: Number, required: true }
  },
  market_study: { type: Boolean, required: true },
  projects:[{
    name: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    duration: { type: String, required: true }
  }],
  audiences: { type: String, required: true }
})

module.exports = mongoose.model('AdvancedForm', AdvancedFormSchema)
