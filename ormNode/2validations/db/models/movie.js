const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {};
  Movie.init(
    // attributes object - that is, each of the column names
    {
      id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type:Sequelize.STRING, 
        allowNull: false,
        validate: {
          // notEmpty: true, 
            // msg property is optional, but helps fae a usability POV
          notEmpty: {
            msg: 'Please provide a value for "title"',
          },
          notNull: {
            msg: 'Please provide a value for "title"'
          }
        },
      }, 
      runtime: {
        type:Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"'
          },
          min: {
            args: 1,
            msg: '"Runtime" must be greater than zero'
          }
        }
      },
      releaseDate: {
        type:Sequelize.DATEONLY, 
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for "releaseDate"'
          },
          isAfter: {
            args: '1895-12-26',
            msg: '"releaseDate" must be on or after 1895-12-27'
          }
        }
      },
      isAvailableOnVHS: {
        type:Sequelize.BOOLEAN,
        defaultValue: false // as in, defaults the value to false
      }
    },
// Model options object - is optional, but can't be an empty object!
// These can be set table-by-table, as here, or set globally in the 
// Sequelize constructor in .db/index.js
    {
      sequelize: sequelize,
      timestamps: false
// The following affect the way Sequelize uses the name of this file, Movie.js (which is
// set up as a standard JavaScript class name) to create a table in the database or 
// a referene to the model in the rest of the app (the 'model name').
      // freezeTableName: true // stops the table name being pluralised to Movies
      // modelName: 'foadyb' // changes the model name to foadyb instead of the default 
      // tableName: 'foadyb' // changes the table name in the db to foadyb
    }
  );
  return Movie;
};


