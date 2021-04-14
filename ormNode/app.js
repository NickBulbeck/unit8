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
    // console.log(attributeMovies.map(movie => movie.toJSON()));

// Operators:  >, <, in, like etc
// First you need this (generally at the top of the file, of course):
const {Op} = db.Sequelize;
// Op is a foadyb variable that contains all the sequelize properties set up 
// at line 18 of ./db/index.js, which includes all the different operators 
// (a couple of which we're about to use here)
  const opMovies = await Movie.findAll({
    attributes: ['id','title'],
    where: {
      releaseDate: {
        [Op.gte]: '2000-01-01'  // >=
      },
      runtime: {
        [Op.gt]: 90             // >
      }
    },
    order: [['id','DESC'],['releaseDate','ASC']]
  })
  // console.log(opMovies.map(movie => movie.toJSON()));
// There are hunners of others; starts with, ends with, between - check the
// docs.

// To update a record:
  const updatedMovie = await Movie.create({
    title: "The Babadook",
    releaseDate: '2015-10-10',
    runtime: 105
  })
  // this creates and saves the babadook
  const checkUpdated = await Movie.findOne({
    where: {
      title: "The Babadook"
    }
  })
  // console.log(checkUpdated.toJSON());
  // method 1:
  checkUpdated.runtime = 106;
  await checkUpdated.save();
  // console.log(checkUpdated.get({plain:true})); // need to refresh the variable
  // method 2:
  await checkUpdated.update({
    title: 'Something random and inappropriate',
    isAvailableOnVHS: true
  },
  {
    fields: ['isAvailableOnVHS'] // Only these fields can be updated
  })
  // console.log(checkUpdated.get({plain:true})); // need to refresh the variable again
  // The fields attribute is useful for white-listing fields that can be 
  // updated so that, for instance, if a form sneaks through an update that 
  // you don't want, you can prevent it. In this instance, the title isn't
  // updated.

// Deleting a record
// 'delete' is a reserved word in JavaScript, so Sequelize uses 'destroy' instead. 
//  if you add the 'paranoid' property to the table's options object, and set it to true:
//    etc
//    isAvailableOnVHS: true
//  },{
//    sequelize: sequelize,
//    paranoid: true
//  }
// ... then .destroy() will logically delete it, but not physically remove it.
// It won't be returned in any SELECT queries, but it will still be in the database
// with a deletedAt value set.



  const toyStory = await Movie.findOne({
    where: {
      title: 'Toy Story 3'
    }
  });
  // console.log(toyStory.toJSON());
  await toyStory.destroy();
  const check = await Movie.findOne({
    where: {
      title: 'Toy Story 3'
    }
  });
  // console.log(check); // can't .toJSON() as it should be null

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