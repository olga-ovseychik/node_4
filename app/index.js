const express = require('express');
const Sequelize = require('sequelize');
const config = require('./config/config');
const db = require('./models/index')(Sequelize, config);
const turtleRoutes = require('./routes/turtleRoutes');
const weaponRoutes = require('./routes/weaponRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/turtles', turtleRoutes);
app.use('/api/weapons', weaponRoutes);
app.use('/api/pizzas', pizzaRoutes); 

app.use((req, res, next) => {
    const error = new Error('Not Found.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ 
        error: { message: err.message } 
    });
});

db.sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

db.sequelize.sync()
    .then(() => console.log(`Database synced successfully.`))
    .catch((error) => console.error('Failed syncing to the database:', error));

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://localhost:${PORT}.`);
});