const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/ItemController');

router.get('/', ItemController.index);
router.post('/', ItemController.store);
router.put('/:id', ItemController.update);
router.delete('/:id', ItemController.destroy);

module.exports = router;