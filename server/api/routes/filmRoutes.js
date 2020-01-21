const express = require('express');
const router = express.Router();
const multer = require('multer');

//---
const filmController = require('../controllers/filmController');

const storageVideo = multer.diskStorage({
    destination: function(req, file, cb) {
      //cb(null, './client/src/assets/');
      cb(null, './server/uploads/videos/');
    },
    filename: function(req, file, cb) {
        myFile = new Date().toISOString() + '_' + file.originalname; 
        cb(null, myFile.replace(/:/g,'_'));
    }
  });

  const storageImg = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './server/uploads/images/');
    },
    filename: function(req, file, cb) {
        myFile = new Date().toISOString() + '_' + file.originalname; 
        cb(null, myFile.replace(/:/g,'_'));
    }
  });

  /*const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };*/

  
  const uploadVideo = multer({
  storage: storageVideo
});


const uploadImg = multer({
  storage: storageImg
});



//---get all----
router.get('/', filmController.getAll);
router.get('/disponible', filmController.getDisponible);

//---get by id----
router.get('/:id', filmController.getOne);

//----post----
router.post('/', filmController.newFilm);

router.post('/upload/video/:id', uploadVideo.single('file') , filmController.uploadFilm);

router.post('/upload/image/:id', uploadImg.single('file') , filmController.uploadImage);

//----patch-----
router.patch('/:id', filmController.updateFilm);

//----delete----
router.delete('/:id', filmController.deleteFilm);

//----get----
router.get('/:id/stream', filmController.streamVideo )

module.exports = router;