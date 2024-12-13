const express = require('express');
const { getAll, getSingeItem, createItem, updateItem, deleteItem } = require('../controllers/turtleController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getSingeItem);
router.post('/', createItem);
router.patch('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
