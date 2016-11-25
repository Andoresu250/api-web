"use strict"
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Organization = require('../lib/models/organization');
const AdvancedForm = require('../lib/models/advanced_form');

router
  .get('/:organization_id/advanced_form', function (req, res, next) {
    let _organization_id = req.params.organization_id
    Organization.findOne({_id: _organization_id})
      .populate('_advanced_form')
      .exec(function (err, organization) {
        if(err){
          res
            .status(403)
            .json({error: true, message: err})
        }else{
          res
            .status(200)
            .json({advanced_form: organization._advanced_form})
        }
      })
  })

  .post('/:organization_id/advanced_form', function (req, res, next) {
    let _organization_id = req.params.organization_id
    let _advanced_form = req.body.advanced_form
    Organization.findOne({_id: _organization_id}, (err, organization) => {
      if(err){
        res.status(403).json({error:true, message: err})
      }else{
        new AdvancedForm({_advanced_form}).save((err, advanced_form) => {
          if(err){
            res.status(403).json({error: true, message: err})
          }else{
            Organization.findByIdAndUpdate(_organization_id,
              { $set: {_advanced_form: advanced_form._id} }, {new: true}, (err, organization) =>{
                if(err){
                  res.status(403).json({error: true, message: err})
                }else{
                  res.status(200).json({advanced_form: advanced_form})
                }
            })
          }
        });
      }
    })
  })

module.exports = router;
