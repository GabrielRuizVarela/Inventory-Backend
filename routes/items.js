const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/ItemController');

router.get('/', ItemController.index);
router.get('/create', ItemController.create);
router.post('/create', ItemController.store);
router.get('/:id/edit', ItemController.edit);
router.get('/:id', ItemController.show);
// router.post('/:id/edit', ItemController.update);
// router.post('/:id/delete', ItemController.destroy);

module.exports = router;