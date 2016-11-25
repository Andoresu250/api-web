"use strict"
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Organization = require('../lib/models/organization');
const User = require('../lib/models/user');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'H0L4FACILITO';


function encryp(text) {
  let cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

router
  .get('/:id', function(req,res,next){
    let _id = req.params.id
    User.findById(_id)
    .populate('_organization')
    .exec(function (err, user) {
      if(err){
        res.status(403).json({error: true, message: err})
      }else{
        res
        .status(200)
        .json({user: user})
      }
      
    });
  })
  .post('/', function(req, res, next) {

    if(!req.body.user){
        res
          .status(403)
          .json({error: true, message: "Body empty"})
    }else{
      let _user = req.body.user
      let _organization = req.body.user.organization
      User.findOne({username: _user.username},
        (err, user) =>{
          if(err){
            res
              .status(403)
              .json({error: true, message: err})
          }
          else if(user){
            res
              .status(200)
              .json({error: true, message: 'Este username ya esta en uso'})
          }else {
            User.findOne({email: _user.email},
              (err, user) => {
                if(err){
                  res
                    .status(403)
                    .json({error: true, message: err})
                }else if(user){
                  res
                    .status(200)
                    .json({error: true, message: 'Este email ya esta en uso'})
                }else{

                  var new_organization = new Organization({
                    name: _organization.name,
                    organization_type: _organization.organization_type,
                    city: _organization.city,
                    is_juridical: _organization.is_juridical
                  });

                  new_organization.save(function (err, organization) {
                    if(err){
                      res
                        .status(403)
                        .json({error: true, message: err})
                    }else{
                      var new_user = new User({
                        _organization: organization._id,
                        username: _user.username,
                        password: encryp(_user.password),
                        email : _user.email,
                        activated: false,
                        permissions_level: 1
                      });

                      new_user.save(function (err, user) {
                        if(err){
                          res
                            .status(403)
                            .json({error: true, message: err})
                        }else{
                          res
                            .status(201)
                            .json({user: user, organization: organization})
                        }
                      });
                    }
                  });
                }
              }
            )
          }
        })
      }
  })
  .put('/:id', function(req, res, next) {
    if(!req.body.user){
        res
          .status(403)
          .json({error: true, message: "Body empty"})
    }else{
      let _id = req.params.id;
      let _user = req.body.user;
      console.log(_id);
      console.log(_user);
      User.findByIdAndUpdate(_id,
        { $set: {username: _user.username, email: _user.email} }, {new: true}, (err, user) => {
            if(err){
              res.status(403).json(error:true, message: err)
            }else{
              res.status(201).json(user: user)
            }
        }
      })
      // User.update(_id, _user);

    }
  })
;

module.exports = router;
