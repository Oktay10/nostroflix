const Badges = require('../models/badges');
const mongoose = require('mongoose');


module.exports = {
    getAll: async (req, res, next) => {
        await Badges.find()
            .select("_id nb uri")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    badges: docs.map(doc => {
                      return {
                        _id: doc._id,
                        nbfilm : doc.nb,
                        uribadge : doc.uri
                      };
                    })
                  };
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }     
  };