const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.index);
router.post('/', CategoryController.create);
router.delete('/:id', CategoryController.destroy);

module.exports = router;