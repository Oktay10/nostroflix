const Post = require('../models/post');
const User = require('../models/user');
const Film = require('../models/film');


const mongoose = require('mongoose');

//postByID
module.exports = {
//Création post
    newPost: async (req, res, next) => {
        const user =   await User.findById(req.body.user);
        const film =   await Film.findById(req.params.id);
        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            user: user,
            film: film,
            date: Date.now(),
            message: req.body.message
        });
        await post
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'post ok ',
                    createdPost: {
                        _id: result._id,
                        user: result.user,
                        message: result.message,
                        film: result.film
                    }
                });
            });
    },
    //Tous les posts d'un film
    getAll: async (req, res, next) => {
        const id = req.params.id;
        await Post.find()
            .where('film').equals(id)
            .populate('user')
            .select("_id message user date")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    posts: docs
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
    //récupérer post par id
    getPost: async (req, res, next) => {
        const id = req.params.id;
        await Post.findById(id)
            .populate('user','_id name')
            .select("_id user film date message")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    posts: docs
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

    //supprimer un post
    deletePost: async (req, res, next) => {
        const post = await Post.findById(req.params.id);
        await Post.findByIdAndRemove(req.params.id)
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Post deleted',
                    deletedPost: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        // //-----
        // for (const element of post.pos) {
        //     const categorie = await Categorie.findById(element._id);
        //     categorie.films.pull(film);
        //     await categorie.save();
        // }

    }
};