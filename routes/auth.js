"use strict"
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../lib/models/user');
const config = require('../lib/config');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'H0L4FACILITO';

function encrypt(text) {
  let cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec
}

const router = express.Router();

router
  .post('/', function (req, res, next) {
    if(!req.body){
      res
        .status(403)
        .json({error: true, message: 'Body empty'})
    }

    let _user = req.body;
    User.findOne({username: _user.username},
      (err, user) => {
        if(err){
          res
            .status(403)
            .json({error: true, message: err})
        }else if(user){
          if(user.password === encrypt(_user.password)){
            let token = jwt.sign(user, config.secret, {
              expiresIn: '24hr'
            })
            
            res
              .status(201)
              .json({token: token, role: user.permissions_level > 1 ? "admin" : "user" , id: user._id, organization_id: user._organization})
          }else{
            res
              .status(403)
              .json({error: true, message: 'No existe usuario'})
          }
        }
      })

  })

  module.exports = router;
