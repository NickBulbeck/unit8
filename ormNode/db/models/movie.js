// This contains the Movie class (or 'table'). Unsurprisingly, there's a 
// file per table in the db/models folder.
const Sequelize = require('sequelize');

// The way we've done it here is to have module.exports with an
// anonymous function. 
module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {};
  Movie.init({
    title: Sequelize.STRING,
    genre: Sequelize.STRING
    },
    {sequelize: sequelize}
  );
  return Movie;
};

// .init() is a static method. It creates a table underneath called Movies. Note that 
// the Model name is always singular, and sequelize creates a plural table name 
// underneath. Then, .init() creates the table.
// .init() takes two arguments. The first is a nobject that contains the column names
// and types. The second is another nobject that sets up what are called the model
// options. Various things like timestamps can go in here, but you have to have a 
// sequelize property that you set to equal the variable 'sequelize'. Sigh.
