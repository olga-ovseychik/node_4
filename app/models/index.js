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

	return {
		Turtle,
		Weapon,
		Pizza,

		sequelize: sequelize,
		Sequelize: Sequelize,
	};
};