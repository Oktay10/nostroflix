const express = require('express');
const router = express.Router();

//---
const userController = require('../controllers/userController');

//---get all----
router.get('/', userController.getAll);

//---get by id----
router.get('/:id', userController.getOne);
router.get('/:id/favoris', userController.getFavoris);
router.get('/:id/vus', userController.getVus);

//----post----
router.post('/signup', userController.newUser);
router.post('/login', userController.loginUser);

//----patch-----
router.patch('/:id/editProfile', userController.updateUser);
router.patch('/:id', userController.updateUser);
router.patch('/:id/favoris', userController.updateFavoris);
router.patch('/:id/vus', userController.updateVus);

//----delete----
router.delete('/:id', userController.deleteUser);
router.delete('/:id/favoris/:film', userController.deleteFavoris);

module.exports = router;