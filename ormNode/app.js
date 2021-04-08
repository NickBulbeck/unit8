const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});

// set up a model; this represents a table in a database.
class Movie extends Sequelize.Model {

}
Movie.init({
    title: Sequelize.STRING,
    genre: Sequelize.STRING
},{
    sequelize: sequelize
});   
// .init() is a static method. It creates a table underneath called Movies. Note that 
// the Model name is always singular, and sequelize creates a plural table name 
// underneath. Then, .init() creates the table.
// .init() takes two arguments. The first is a nobject that contains the column names
// and types. The second is another nobject that sets up what are called the model
// options. Various things like timestamps can go in here, but you have to have a 
// sequelize property that you set to equal the variable 'sequelize'. Sigh.


const connectToDB = async () => {
// Calling 'sync()' executes a CREATE TABLE IF NOT EXISTS in the underlying SQL.
// Adding the {force:true} configuration (which you can leave out) additionally performs a 
// DROP TABLE IF EXISTS first so that all the tables are refreshed when youy start the app.
// Clearly, you ONLY want to do this in development or testing!
    // await Movie.sync(); // To save/update one table
    await sequelize.sync({force:true}); // To update all tables (more future-proof!)
    try {
        // await sequelize.authenticate(); // This only needs doing once.
        const movie = await Movie.create({ // this creates an instance of the Movie class, which
            title: "The Babadook",         // equates to a record in the table.
            genre: "Feel-good horror"
        });
        console.log(`Yippeeeee! Tables sync'd with movies.db!`);
        console.log(movie.toJSON()) // the .toJSON formats it more readably
    } catch(error) {
        console.log('Error connecting to movies.db: ', error);
    }
}

connectToDB();