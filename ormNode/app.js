const Sequelize = require('sequelize');

// The following code is re-factored into index.js:
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'movies.db',
//     logging: true
// });  ... and replaced therefore by
const db = require('./db'); // this pulls in ./db/index.js by opinionation


// In the refactor,
// this code is moved to ./db/models/movie.js
// class Movie extends Sequelize.Model {}
// Movie.init({
//     title: Sequelize.STRING,
//     genre: Sequelize.STRING
// },{
//     sequelize: sequelize
// });  ... and is therefore replaced by
const {Movie} = db.models; // {Movie} is an object, referenced below   


const connectToDB = async () => {
// Calling 'sync()' executes a CREATE TABLE IF NOT EXISTS in the underlying SQL.
// Adding the {force:true} configuration (which you can leave out) additionally performs a 
// DROP TABLE IF EXISTS first so that all the tables are refreshed when youy start the app.
// Clearly, you ONLY want to do this in development or testing!
    // await Movie.sync(); // To save/update one table
    await db.sequelize.sync({force:true}); // To update all tables (more future-proof!)
    // and note that it's db.sequelize, not just sequelize; because sequelize is no longer 
    // require'd in here after the refactor (it's attached to the db object in ./db/index.js).
    try {
        // await sequelize.authenticate(); // This only needs doing once.
        const movie = await Movie.create({ // this creates an instance of the Movie class, which
            title: "The Babadook",         // equates to a record in the table.
            genre: "Feel-good horror"
        }); 
        console.log(`Yippeeeee! Tables sync'd with movies.db!`);
        console.log(movie.toJSON()) // the .toJSON formats it more readably
        await Movie.create({        // You don't need to declare the function as a variable
          title: "Event Horizon",   // if you don't want to refer to it subsequently (in, 
          genre: "Feel-bad horror"  // for instance, a console.log()).
        })
    } catch(error) {
        console.log('Error connecting to movies.db: ', error);
    }
    demoPromiseAll(); // I'll show you this next...
}

// A good way of wrapping all your commits in what amounts to a transaction is to use 
// Promise.all() like this:
const demoPromiseAll = async () => {
  try {
    await Promise.all([ // Promise.all() takes an array of Promises
      Movie.create({
        title: "Groundhog Day",
        genre: "Comedy"
      }),
      Movie.create({
        title: "The Naked Gun",
        genre: "Comedy"
      })
    ])
  } catch(error) {
    console.error("Error in Promise.all(): ", error);
  }
}


connectToDB();