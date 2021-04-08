const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'movies.db'
});

const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Yippeeeee! Connected to movies.db!');
    } catch(error) {
        console.log('Error connecting to movies.db: ', error);
    }
}

connectToDB();