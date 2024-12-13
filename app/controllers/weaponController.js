const Sequelize = require('sequelize');
const config = require('../config/config');
const { Weapon } = require('../models/index')(Sequelize, config);

const createItem = ('/api/weapons', async (req, res) => {
    try {
        const weapon = await Weapon.create(req.body);
        res.status(201).json(weapon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getAll = ('/', async (req, res) => {
    try {
        /* --------------------------- Find all weapons -------------------------- */
        const { count, rows }  = await Weapon.findAndCountAll({});


        /* ------------- Find all weapons where dps greater than 100 ------------- */
        // const  { count, rows } = await Weapon.findAndCountAll({
        //     where: { dps: { [Sequelize.Op.gt]: 100 } },
        //     order: [['dps', 'ASC']],
        // });

        if (!count) {
            return res.status(200).json({ message: 'No weapons found.'});
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getSingeItem = ('/:id', async (req, res) => {
    try {
        const weapon = await Weapon.findByPk(req.params.id);

        if (!weapon) return res.status(404).json({ error: 'Weapon not found.' });
        
        res.status(200).json(weapon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateItem = ('/:id', async (req, res) => {
    try {
        const weapon = await Weapon.findByPk(req.params.id);

        if (!weapon) return res.status(404).json({ error: 'Weapon not found.' });
        
        await weapon.update(req.body);
        
        await weapon.save();
        res.status(200).json(weapon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const deleteItem = ('/:id', async (req, res) => {
    try {
        const weapon = await Weapon.findByPk(req.params.id);

        if (!weapon) return res.status(404).json({ error: 'Weapon not found.' });
        
        await weapon.destroy();
        
        res.status(204).send('Weapon deleted.');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = { getAll, getSingeItem, createItem, updateItem, deleteItem };