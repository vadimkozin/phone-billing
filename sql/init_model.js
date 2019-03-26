/**
   * Initialize a model, representing a table in the DB, with attributes and options.
   *
   * The table columns are define by the hash that is given as the second argument. Each attribute of the hash represents a column. A short table definition might look like this:
   *
   * ```js
   * Project.init({
   *   columnA: {
   *     type: Sequelize.BOOLEAN,
   *     validate: {
   *       is: ['[a-z]','i'],        // will only allow letters
   *       max: 23,                  // only allow values <= 23
   *       isIn: {
   *         args: [['en', 'zh']],
   *         msg: "Must be English or Chinese"
   *       }
   *     },
   *     field: 'column_a'
   *     // Other attributes here
   *   },
   *   columnB: Sequelize.STRING,
   *   columnC: 'MY VERY OWN COLUMN TYPE'
   * }, {sequelize})
   *
   * sequelize.models.modelName // The model will now be available in models under the class name
   * ```
   *
   *
   * As shown above, column definitions can be either strings, a reference to one of the datatypes that are predefined on the Sequelize constructor, or an object that allows you to specify both the type of the column, and other attributes such as default values, foreign key constraints and custom setters and getters.
   *
   * For a list of possible data types, see {@link DataTypes}
   *
   * For more about validation, see http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations
   *
   * @see {@link DataTypes}
   * @see {@link Hooks}
   *
   * @param {Object}                  attributes An object, where each attribute is a column of the table. Each column can be either a DataType, a string or a type-description object, with the properties described below:
   * @param {String|DataTypes|Object}  attributes.column The description of a database column
   * @param {String|DataTypes}         attributes.column.type A string or a data type
   * @param {Boolean}                 [attributes.column.allowNull=true] If false, the column will have a NOT NULL constraint, and a not null validation will be run before an instance is saved.
   * @param {any}                     [attributes.column.defaultValue=null] A literal default value, a JavaScript function, or an SQL function (see `sequelize.fn`)
   * @param {String|Boolean}          [attributes.column.unique=false] If true, the column will get a unique constraint. If a string is provided, the column will be part of a composite unique index. If multiple columns have the same string, they will be part of the same unique index
   * @param {Boolean}                 [attributes.column.primaryKey=false]
   * @param {String}                  [attributes.column.field=null] If set, sequelize will map the attribute name to a different name in the database
   * @param {Boolean}                 [attributes.column.autoIncrement=false]
   * @param {String}                  [attributes.column.comment=null]
   * @param {String|Model}            [attributes.column.references=null] An object with reference configurations
   * @param {String|Model}            [attributes.column.references.model] If this column references another table, provide it here as a Model, or a string
   * @param {String}                  [attributes.column.references.key='id'] The column of the foreign table that this column references
   * @param {String}                  [attributes.column.onUpdate] What should happen when the referenced key is updated. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or NO ACTION
   * @param {String}                  [attributes.column.onDelete] What should happen when the referenced key is deleted. One of CASCADE, RESTRICT, SET DEFAULT, SET NULL or NO ACTION
   * @param {Function}                [attributes.column.get] Provide a custom getter for this column. Use `this.getDataValue(String)` to manipulate the underlying values.
   * @param {Function}                [attributes.column.set] Provide a custom setter for this column. Use `this.setDataValue(String, Value)` to manipulate the underlying values.
   * @param {Object}                  [attributes.validate] An object of validations to execute for this column every time the model is saved. Can be either the name of a validation provided by validator.js, a validation function provided by extending validator.js (see the `DAOValidator` property for more details), or a custom validation function. Custom validation functions are called with the value of the field, and can possibly take a second callback argument, to signal that they are asynchronous. If the validator is sync, it should throw in the case of a failed validation, it it is async, the callback should be called with the error text.
   * @param {Object}                  options These options are merged with the default define options provided to the Sequelize constructor
   * @param {Object}                  options.sequelize Define the sequelize instance to attach to the new Model. Throw error if none is provided.
   * @param {String}                  [options.modelName] Set name of the model. By default its same as Class name.
   * @param {Object}                  [options.defaultScope={}] Define the default search scope to use for this model. Scopes have the same form as the options passed to find / findAll
   * @param {Object}                  [options.scopes] More scopes, defined in the same way as defaultScope above. See `Model.scope` for more information about how scopes are defined, and what you can do with them
   * @param {Boolean}                 [options.omitNull] Don't persist null values. This means that all columns with null values will not be saved
   * @param {Boolean}                 [options.timestamps=true] Adds createdAt and updatedAt timestamps to the model.
   * @param {Boolean}                 [options.paranoid=false] Calling `destroy` will not delete the model, but instead set a `deletedAt` timestamp if this is true. Needs `timestamps=true` to work
   * @param {Boolean}                 [options.underscored=false] Converts all camelCased columns to underscored if true. Will not affect timestamp fields named explicitly by model options and will not affect fields with explicitly set `field` option
   * @param {Boolean}                 [options.underscoredAll=false] Converts camelCased model names to underscored table names if true. Will not change model name if freezeTableName is set to true
   * @param {Boolean}                 [options.freezeTableName=false] If freezeTableName is true, sequelize will not try to alter the model name to get the table name. Otherwise, the model name will be pluralized
   * @param {Object}                  [options.name] An object with two attributes, `singular` and `plural`, which are used when this model is associated to others.
   * @param {String}                  [options.name.singular=Utils.singularize(modelName)]
   * @param {String}                  [options.name.plural=Utils.pluralize(modelName)]
   * @param {Array<Object>}           [options.indexes]
   * @param {String}                  [options.indexes[].name] The name of the index. Defaults to model name + _ + fields concatenated
   * @param {String}                  [options.indexes[].type] Index type. Only used by mysql. One of `UNIQUE`, `FULLTEXT` and `SPATIAL`
   * @param {String}                  [options.indexes[].method] The method to create the index by (`USING` statement in SQL). BTREE and HASH are supported by mysql and postgres, and postgres additionally supports GIST and GIN.
   * @param {Boolean}                 [options.indexes[].unique=false] Should the index by unique? Can also be triggered by setting type to `UNIQUE`
   * @param {Boolean}                 [options.indexes[].concurrently=false] PostgreSQL will build the index without taking any write locks. Postgres only
   * @param {Array<String|Object>}    [options.indexes[].fields] An array of the fields to index. Each field can either be a string containing the name of the field, a sequelize object (e.g `sequelize.fn`), or an object with the following attributes: `attribute` (field name), `length` (create a prefix index of length chars), `order` (the direction the column should be sorted in), `collate` (the collation (sort order) for the column)
   * @param {String|Boolean}          [options.createdAt] Override the name of the createdAt column if a string is provided, or disable it if false. Timestamps must be true. Not affected by underscored setting.
   * @param {String|Boolean}          [options.updatedAt] Override the name of the updatedAt column if a string is provided, or disable it if false. Timestamps must be true. Not affected by underscored setting.
   * @param {String|Boolean}          [options.deletedAt] Override the name of the deletedAt column if a string is provided, or disable it if false. Timestamps must be true. Not affected by underscored setting.
   * @param {String}                  [options.tableName] Defaults to pluralized model name, unless freezeTableName is true, in which case it uses model name verbatim
   * @param {String}                  [options.schema='public']
   * @param {String}                  [options.engine]
   * @param {String}                  [options.charset]
   * @param {String}                  [options.comment]
   * @param {String}                  [options.collate]
   * @param {String}                  [options.initialAutoIncrement] Set the initial AUTO_INCREMENT value for the table in MySQL.
   * @param {Object}                  [options.hooks] An object of hook function that are called before and after certain lifecycle events. The possible hooks are: beforeValidate, afterValidate, validationFailed, beforeBulkCreate, beforeBulkDestroy, beforeBulkUpdate, beforeCreate, beforeDestroy, beforeUpdate, afterCreate, afterDestroy, afterUpdate, afterBulkCreate, afterBulkDestory and afterBulkUpdate. See Hooks for more information about hook functions and their signatures. Each property can either be a function, or an array of functions.
   * @param {Object}                  [options.validate] An object of model wide validations. Validations have access to all model values via `this`. If the validator function takes an argument, it is assumed to be async, and is called with a callback that accepts an optional error.
   * @return {Model}
   */