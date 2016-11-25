"use strict"
const express = require('express');
const User = require('../lib/models/user');
const Organization = require('../lib/models/organization');
const config = require('../lib/config');

const router = express.Router();

router
  .get('/', function(req,res,next){

    User.find({})
    .populate('_organization')
    .exec(function (err, users) {
      if(err){
        if (err) return handleError(err);
      }
      res
        .status(200)
        .json({users: users})
    });
  })

  .post('/:id/activate', function (req, res, next) {
    if(!req.params.id && !req.body){
      res
        .status(403)
        .json({error: true, message: "Falta id"})
    }else{
      let _id = req.params.id;
      User.findByIdAndUpdate(_id,
        { $set: {activated: true} }, {new: true}, (err, user) => {
          res
            .status(200)
            .json({user: user})
      })
    }
  })

module.exports = router;
