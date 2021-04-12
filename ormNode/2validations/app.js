const Sequelize = require('sequelize');

const db = require('./db'); // this pulls in ./db/index.js by opinionation
const {Movie,Person} = db.models; // {Movie} is an object, referenced below   

console.log(Movie);

const connectToDB = async () => {
  await db.sequelize.sync({force:true});
  demoPromiseAll(); // I'll show you this next...
}
// The disadvantage of the Promise.all() approach is that it creates an error as soon as 
// one Promise fails. So, if you have a string of movies with invalid data, you only
// see errors for the first one.
const demoPromiseAll = async () => {
  try {
    await Promise.all([ // Promise.all() takes an array of Promises
      Movie.create({
        title: "Groundhog Day",
        runtime: 110,
        releaseDate: '1985-01-12'
      }),
      Movie.create({
        title: "The Naked Gun",
        runtime: 107,
        releaseDate: '1895-12-27'
      }),
      Person.create({
        firstName: "Nick",
        lastName: "Bulbeck"
      })
    ])
  } catch(error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ',errors);
    } else {
      throw error;
    }
  }
}


connectToDB();