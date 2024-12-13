module.exports = (Sequelize, sequelize) => {
	const { DataTypes } = Sequelize;

	return sequelize.define('Pizza', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		  },
		  name: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  description: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  calories: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		  },
	});
};