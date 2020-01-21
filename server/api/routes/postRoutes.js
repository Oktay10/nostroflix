const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');


router.get('/:id', postController.getAll);

//----delete----
router.delete('/:id', postController.deletePost);

router.post('/:id', postController.newPost);

module.exports = router;