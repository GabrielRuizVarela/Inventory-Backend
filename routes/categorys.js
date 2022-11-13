const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.index);
// router.get('/create', CategoryController.create);
router.post('/create', CategoryController.create);
// router.get('/:id/edit', CategoryController.edit);
// router.get('/:id', CategoryController.show);
router.post('/:id/edit', CategoryController.update);
router.post('/:id/delete', CategoryController.destroy);

module.exports = router;