'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not,
  $or: Op.or,
  $and: Op.and,
  $eq: Op.eq,
  $in: Op.in
}
async function getDB() {

  let sequelize;

  let secretString = await getConfigValues();
  secretString.logging = false;
  secretString.operatorsAliases = operatorsAliases
  sequelize = new Sequelize(secretString.database, secretString.username, secretString.password, secretString)

  const modelsPath = __dirname + "/models"

  fs
    .readdirSync(modelsPath)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(modelsPath, file));
      db[model.name] = model;

    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}


async function getConfigValues() {
    let configValues = require(__dirname + '/../../config/config.json')[env];
  return configValues
}

module.exports = { db, getDB, getConfigValues };
