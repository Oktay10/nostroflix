const User = require('../models/user');
const Film = require('../models/film');

//---
const mongoose = require('mongoose');

//---
const bcrypt = require("bcryptjs");

//---
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: async (req, res, next) => {
    await User.find()
      .select()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },
  getOne: async (req, res, next) => {
    const id = req.params.id;
    await User.findById(id)
      .select("_id name email nb_filmW")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            user: doc
          });
        } else {
          res.status(400).json({
            message: 'No valide entry found for provided ID'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  newUser: async (req, res, next) => {
    await User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                password: hash,
                level : '-1',
                nbfilmW : '0',
                disponible: req.body.disponible
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  },
  loginUser: async (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              level: user[0].level
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user : user[0]

          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  },
  updateUser: async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user)
    await User.findByIdAndUpdate(req.params.id, req.body.user)
  .exec()
  .then(data => {
      console.log(data);
      res.status(200).json({
        message: 'User updated',
        user: data
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
        });
  },
  updateFavoris: async (req, res, next) => {
    const film = await Film.findById(req.body.film);
    console.log(film)
    await User.findByIdAndUpdate(req.params.id,{
      $push: { 
        favoris: film 
      }
  })
  .exec()
  .then(data => {
      console.log(data);
      res.status(200).json({
        message: 'Favoris updated',
        user: data
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
        });
},
updateVus: async (req, res, next) => {
  const film = await Film.findById(req.body.film);
  console.log(film)
  await User.findByIdAndUpdate(req.params.id,{
    $push: { 
      vus: film 
    }
})
.exec()
.then(data => {
    console.log(data);
    res.status(200).json({
      message: 'Vus updated',
      user: data
  });
})
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
      });
},
deleteFavoris: async (req, res, next) => { 
  //const film = await Film.findById(req.body.film); 
  console.log(req.params.film);

      await User.findByIdAndUpdate(req.params.id,{$pull: {favoris: req.params.film}},{multi: true})        
      .exec()
      .then(result => {
          res.status(200).json({
              message: 'Film deleted'
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          });
      });

},
  deleteUser: async (req, res, next) => {
      
      await User.findByIdAndRemove(req.params.id)
          .exec()
          .then(result => {
              res.status(200).json({
                  message: 'User deleted',
                  deletedUser: {
                      id: result._id,
                      name: result.name,
                      email: result.email,
                  }
              });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({
                  error: err
              });
          });

          let posts = Post.find()
                      .populate('user')
                      .select("_id message user date")
                      .exec()
                      .then()
                      .catch();



          for(const p of posts){
            if(p._id == req.params.id){
              posts.pull(p);
              await posts.save();
            }
            
        }

  },
  logout: async (req, res, next) => { 


    
  },

  getFavoris: async (req, res, next) => {
    const id = req.params.id;
    await User.findById(id)
      .populate("favoris")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            favoris: doc.favoris
          });
        } else {
          res.status(400).json({
            message: 'No valide entry found for provided ID'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  getVus: async (req, res, next) => {
    const id = req.params.id;
    await User.findById(id)
      .populate("vus")
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
            vus: doc.vus
          });
        } else {
          res.status(400).json({
            message: 'No valide entry found for provided ID'
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
};