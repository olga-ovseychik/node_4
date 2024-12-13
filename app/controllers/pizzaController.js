const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const config = require('../config/config');
const { Pizza, Turtle } = require('../models/index')(Sequelize, config);

const createItem = ('/', async (req, res) => {
    try {
        const pizza = await Pizza.create(req.body);
        res.status(201).json(pizza);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getAll = ('/', async (req, res) => {
    try {
        /* ---------------------------- Get all pizzas --------------------------- */
        const { count, rows }  = await Pizza.findAndCountAll({});


        /* ------------------ Get all pizzas without duplicates ------------------ */
        /*
        const { count, rows } = await Pizza.findAndCountAll({
            attributes: [[Sequelize.literal('DISTINCT ON ("Pizza"."name") "Pizza"."name"'), 'name']], 
            include: [
              {
                model: Turtle,
                as: 'firstFavoriteOfTurtles', 
                required: false, 
                attributes: [], 
              },
              {
                model: Turtle,
                as: 'secondFavoriteOfTurtles', 
                required: false, 
                attributes: [], 
              },
            ],
            where: {
              [Op.or]: [
                { '$firstFavoriteOfTurtles.firstFavoritePizzaId$': { [Op.ne]: null } },
                { '$secondFavoriteOfTurtles.secondFavoritePizzaId$': { [Op.ne]: null } }, 
              ],
            },
            raw: true,
          });
          */


        /* ------ Update all pizzas with a calorie count greater than 3000 ------ */
        /*
        await Pizza.update({ description: Sequelize.literal(`CONCAT(description, ' SUPER FAT!')`) }, { 
            where: { calories: { [Op.gt]: 3000 } } 
        });

        const { count, rows }  = await Pizza.findAndCountAll({ where: {calories: { [Op.gt]: 3000 }} });
        */

        if (!count) {
            return res.status(200).json({ message: 'No pizzas found.'});
        }
        
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getSingeItem = ('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findByPk(req.params.id);

        if (!pizza) return res.status(404).json({ error: 'Pizza not found.' });
        
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateItem = ('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findByPk(req.params.id);

        if (!pizza) return res.status(404).json({ error: 'Pizza not found.' });
        
        await pizza.update(req.body);
        
        await pizza.save();
        res.status(200).json(pizza);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const deleteItem = ('/:id', async (req, res) => {
    try {
        const pizza = await Pizza.findByPk(req.params.id);

        if (!pizza) return res.status(404).json({ error: 'Pizza not found.' });
        
        await pizza.destroy();
        
        res.status(204).send('Pizza deleted.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getAll, getSingeItem, createItem, updateItem, deleteItem };