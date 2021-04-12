// ./db/index.js configures the Sequelize instance. It require's in all the 
// models, or tables, fae ./db/models as you'd expect.

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false,
  define: {
    // you can add properties in here. (This object CAN be empty.) An example:
    // timestamps: false
  }
});

const db = {
  sequelize, // adds in our specific database
  Sequelize, // adds in all the properties and methods of Sequelize generally
  models: {} // set up an empty object first
};
// add a Movie object to db.movies:
db.models.Movie = require('./models/movie.js')(sequelize);
db.models.Person = require('./models/person.js')(sequelize);
// ./modles/movie.js exports the Movie class, remember.

module.exports = db
// exports the whole database, along with the Sequelize class, 
// and all the models (or tables).