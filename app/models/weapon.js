module.exports = (Sequelize, sequelize) => {
	const { DataTypes } = Sequelize;

    return sequelize.define('Weapon', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		  },
		  name: {
			type: DataTypes.STRING,
			allowNull: false,
		  },
		  dps: {
			type: DataTypes.INTEGER,
			allowNull: false,
		  }
    });
};