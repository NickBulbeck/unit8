const Sequelize = require('sequelize');

const db = require('./db'); // this pulls in ./db/index.js by opinionation
const {Movie,Person} = db.models; // {Movie} is an object, referenced below   

const connectToDB = async () => {
  await db.sequelize.sync({force:true});
  try {
    const movie = await Movie.create(
      {
        title: 'Toy Story 3',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: false
     }
   )
  //  console.log(movie.toJSON());
  // Movie.build() creates a non-persistent record (useful if you're gathering
  // data piecemeal via a form). It still picks up default values.
   const movie2 = await Movie.build({
     title: 'Alien',
     runtime: 122,
     releaseDate: '1979-10-20',
     isAvailableOnVHS: true
   })
  //  console.log(movie2.toJSON());  // id is null
   await movie2.save();
  //  console.log(movie2.toJSON());  // id is 2
  // findByPk() - i.e. find by primary key
    const movieById = await Movie.findByPk (1);
    // console.log(movieById.toJSON()); // the first movie
    const movieById2 = await Movie.findByPk (10);
    // console.log(movieById2); // null, so can't .toJSON it
  //
  // findAll() - returns an array of Movie instances
    const allMovies = await Movie.findAll();
    // console.log(allMovies.map(movie => movie.toJSON()));
    const allAlienMovies = await Movie.findAll({
      where: {
        title: 'Alien'
      }
    }
   )
  //  console.log(allAlienMovies.map(movie => movie.toJSON()));
   // Even if there's only one result, it's still in an array.
//  Can use and's, like this:
//  where: {
//    runtime: 100,
//    isAvailableOnVHS: true
//  }
//
// findOne() - finds the first instance matching the query.

// Attributes - SELECT X,Y FROM...
    const attributeMovies = await Movie.findAll({
      attributes: ['id','title'],
      where: {
        isAvailableOnVHS: true
      }
    })
    console.log(attributeMovies.map(movie => movie.toJSON()));
//----------------------------------------------------------------------------
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