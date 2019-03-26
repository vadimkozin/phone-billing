module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customers', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER(11),
			title: "",
			formType: "TEXT",
			autoIncrement: true
		},
		cid: {
			allowNull: false,
			defaultValue: '0',
			type: DataTypes.INTEGER(11),
			title: "Код клиента",
			formType: "TEXT",
			unique: true
		},
		name: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(100),
			title: "Название клиента",
			formType: "TEXT"
		},
		alias: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(30),
			title: "Краткое назв. клиента",
			formType: "TEXT"
		},
		dognum: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(16),
			title: "Номер договора",
			formType: "TEXT"
		},
		dogdate: {
			allowNull: false,
			type: DataTypes.DATEONLY,
			title: "Дата договора",
			formType: "DATE"
		},
		bsec: {
			allowNull: false,
			defaultValue: '0',
			type: DataTypes.INTEGER(2),
			title: "Бесплатных секунд",
			formType: "TEXT"
		},
		prim: {
			allowNull: true,
			defaultValue: '-',
			type: DataTypes.CHAR(50),
			title: "Примечание",
			formType: "TEXT"
		},
		// ts: {
		// 	allowNull: false,
		// 	defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
		// 	type: DataTypes.DATE,
		// 	title: "",
		// 	formType: "DATE"
		// }
	}, {
		tableName: 'x_customers',
		timestamps: false
	});
};
