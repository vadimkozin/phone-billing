module.exports = function(sequelize, DataTypes) {
	return sequelize.define('numbers', {
		id: {
			
			allowNull: false,
			type: DataTypes.INTEGER(11),
			title: "",
			formType: "TEXT",
			autoIncrement: true,
			unique: true
		},
		cid: {
			allowNull: false,
			defaultValue: '0',
			type: DataTypes.INTEGER(11),
			title: "Код клиента",
			formType: "TEXT"
		},
		number: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.CHAR(16),
			title: "Номер",
			formType: "TEXT"
		},
		numstat: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(16),
			title: "Номер группы. Для статистики номера группируются по 10 штук.",
			formType: "TEXT"
		},
		lines: {
			allowNull: false,
			defaultValue: '1',
			type: DataTypes.INTEGER(3),
			title: "Количество линий",
			formType: "TEXT"
		},
		dt: {
			allowNull: false,
			defaultValue: '0000-00-00',
			type: DataTypes.DATEONLY,
			title: "Дата включения номера",
			formType: "DATE"
		},
		oper: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(1),
			title: "Код оператора у которого арендован номер (TSCZ) T-TTK S-Cytylan C-Centel Z-TZ",
			formType: "TEXT"
		},
		f: {
			allowNull: false,
			defaultValue: '-',
			type: DataTypes.CHAR(1),
			title: "флаг: + (см. numhistory)",
			formType: "TEXT",
			comment: "КОментрарий",
		},

		 'ts': {
			  type: DataTypes.TIMESTAMP,
			  allowNull: false,
			  title: "время обновления",
			  formType: "DATE"
		   },
	}, {
		tableName: 'x_numbers2',
		timestamps: false,

		//paranoid: true,
		underscored: true,
		comment: "Номера"
	});
};
