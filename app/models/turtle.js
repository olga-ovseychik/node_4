module.exports = (Sequelize, sequelize) => {
	const { DataTypes } = Sequelize;

	return sequelize.define('Turtle', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		  },
		  name: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  color: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  weaponId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		  },
		  firstFavoritePizzaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		  },
		  secondFavoritePizzaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		  },
	});
};