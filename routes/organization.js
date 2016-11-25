"use strict"
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Organization = require('../lib/models/organization');

router
  .get('/', function(req, res, next){
    Organization.find({},
      (err, organizations) => {
        res
          .status(201)
          .json({organizations: organizations})
      }
    )
  })

module.exports = router;
