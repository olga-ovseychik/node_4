const Sequelize = require('sequelize');
const config = require('../config/config');
const { Turtle } = require('../models/index')(Sequelize, config);

const createItem = ('/', async (req, res) => {
    try {
        const turtle = await Turtle.create(req.body);
        res.status(201).json(turtle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getAll = ('/', async (req, res) => {
    try {
        const { count, rows }  = await Turtle.findAndCountAll({});

        if (!count) {
            return res.status(200).json({ message: 'No turtles found.'});
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getSingeItem = ('/:id', async (req, res) => {
    try {
        const turtle = await Turtle.findByPk(req.params.id);

        if (!turtle) return res.status(404).json({ error: 'Turtle not found.' });
        
        res.status(200).json(turtle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateItem = ('/:id', async (req, res) => {
    try {
        const turtle = await Turtle.findByPk(req.params.id);

        if (!turtle) return res.status(404).json({ error: 'Turtle not found.' });
        
        await turtle.update(req.body);
        
        await turtle.save();
        res.status(200).json(turtle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const deleteItem = ('/:id', async (req, res) => {
    try {
        const turtle = await Turtle.findByPk(req.params.id);

        if (!turtle) return res.status(404).json({ error: 'Turtle not found.' });
        
        await turtle.destroy();
        
        res.status(204).send('Turtle deleted.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getAll, getSingeItem, createItem, updateItem, deleteItem };