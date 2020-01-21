const express = require('express');
const router = express.Router();

//---
const categorieController = require('../controllers/categorieController');

//---
const checkAuth = require('../middleware/check-auth');

//---get all----
router.get('/', categorieController.getAll);

//---get by id----
router.get('/:id', categorieController.getOne);

//----post----
router.post('/', categorieController.newCategorie);

//----patch-----
router.patch('/:id', categorieController.updateCategorie);

//----delete----
router.delete('/:id', checkAuth, categorieController.deleteCategorie);

module.exports = router;