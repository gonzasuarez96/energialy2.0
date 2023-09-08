require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/energialy`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Loading model files from the '/models' directory and pushing their definitions (exported objects) into the modelDefiners array.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injecting the Sequelize instance into each model definition
modelDefiners.forEach(model => model(sequelize));
// Capitalizing the model names for consistency. ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructuring models
const { Users, Companies, Categories, Subcategories, Locations, Tenders, Proposals } = sequelize.models;

// Associations
Companies.hasMany(Users);
Users.belongsTo(Companies);

Companies.belongsToMany(Categories, { through: 'Companies_Categories' });
Categories.belongsToMany(Companies, { through: 'Companies_Categories' });

Companies.belongsToMany(Subcategories, { through: 'Companies_Subcategories' });
Subcategories.belongsToMany(Companies, { through: 'Companies_Subcategories' });

Categories.hasMany(Subcategories);
Subcategories.belongsTo(Categories);

Companies.belongsToMany(Locations, { through: 'Companies_Locations' });
Locations.belongsToMany(Companies, { through: 'Companies_Locations' });

Locations.hasMany(Tenders);
Tenders.belongsTo(Locations);

Companies.hasMany(Tenders);
Tenders.belongsTo(Companies);

Tenders.belongsToMany(Categories, { through: 'Tenders_Categories' });
Categories.belongsToMany(Tenders, { through: 'Tenders_Categories' });

Tenders.belongsToMany(Subcategories, { through: 'Tenders_Subcategories' });
Subcategories.belongsToMany(Tenders, { through: 'Tenders_Subcategories' });

Tenders.hasMany(Proposals);
Proposals.belongsTo(Tenders);

Companies.hasMany(Proposals);
Proposals.belongsTo(Companies);

module.exports = {
  ...sequelize.models, // to import models like this: const { Product, User } = require('./db.js');
  conn: sequelize,     // to import the connection { conn } = require('./db.js');
};
