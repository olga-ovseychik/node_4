require('dotenv').config();
const TurtleModel = require('./turtle');
const WeaponModel = require('./weapon');
const PizzaModel = require('./pizza');

module.exports = (Sequelize, config) => {
	const { database, username, password, host, port } = config;

	const sequelize = new Sequelize(database, username, password, 
		{
			host,
			port,
			dialect: 'postgres', 
		} 
	);

	const Turtle = TurtleModel(Sequelize, sequelize);
	const Weapon = WeaponModel(Sequelize, sequelize);
	const Pizza = PizzaModel(Sequelize, sequelize);

    Turtle.belongsTo(Weapon, { foreignKey: 'weaponId' });
	Turtle.belongsTo(Pizza, { foreignKey: 'firstFavoritePizzaId', as: 'firstFavoritePizza' });
	Turtle.belongsTo(Pizza, { foreignKey: 'secondFavoritePizzaId', as: 'secondFavoritePizza' });

	Pizza.hasMany(Turtle, { foreignKey: 'firstFavoritePizzaId', as: 'firstFavoriteOfTurtles' });
	Pizza.hasMany(Turtle, { foreignKey: 'secondFavoritePizzaId', as: 'secondFavoriteOfTurtles' });

	return {
		Turtle,
		Weapon,
		Pizza,

		sequelize: sequelize,
		Sequelize: Sequelize,
	};
};