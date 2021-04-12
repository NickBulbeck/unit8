// This contains the Movie class (or 'table'). Unsurprisingly, there's a 
// file per table in the db/models folder. All of the basic setup for the 
// class goes in here.
// This includes configuration and validating options.
const Sequelize = require('sequelize');

// The way we've done it here is to have module.exports with an
// anonymous function. 
module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {};
  Movie.init({
    // You don't have to set an object full of configuration attributes, 
    // so you can just specificy a data-type. But if you don't even do that
    // much, you'll get an error. If you do, you can add a whole load of 
    // different attributes, as exemplified below:
    // title: Sequelize.STRING,  // this is the minimum you can get away with.
    // Note that there's some dispute about whether the 2^16-bit limit actually applies...
// Sequelize creates an id column by default, but you can override the default by setting your own:
    id: { // this is a foadby name. It's the primaryKey attribute that makes it the key.
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type:Sequelize.STRING, // Default length 255; can specify STRING(N) up to 65535
      allowNull: false
    }, 
    runtime: {
      type:Sequelize.INTEGER,
      allowNull: false
    },
    releaseDate: {
      type:Sequelize.DATEONLY, // Date without time, BTW - YYYY-MM-DD.
      allowNull: false
    },
    isAvailableOnVHS: {
      type:Sequelize.BOOLEAN,
      allowNull: false, // Testing... this is indeed redundant if you set a default value
      defaultValue: false // as in, defaults the value to false
    }
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
