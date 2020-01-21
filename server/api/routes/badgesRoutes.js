const express = require('express');
const router = express.Router();

//---
const badgesController = require('../controllers/badgesController');



//---get by id----
router.get('/', badgesController.getAll);



module.exports = router;