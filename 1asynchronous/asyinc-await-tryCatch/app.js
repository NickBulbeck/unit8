const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

// This is just added to show a less verbose way of using try/catch blocks.

function getUsers(){
  return new Promise((resolve, reject)=> {
    fs.readFile('data.json', 'utf-8', (err, data)=> {
      if(err){
        reject(err);
      } else {
        const users = JSON.parse(data);
        resolve(users);
      }
    });
  });
}

// This is the basic app.get(). There's nothing wrong with it as such, but in a typical
// app with many different routes, it makes for a lot of repetition of the try/catch
// block. 

// app.get('/', async (req,res) => { 
//   try {
//     const users = await getUsers();
//     // throw new Error("Foadyb"); // again, use this to test the error-handling.
//     res.render('index', {title: "Users", users: users.users});
//   } catch(foadybError) {
//     res.render('error', {error: foadybError});  
//   }
// });

// So this is a way of writing try/catch just once, then calling it whenever you need it.

function asyncHandler(callback) {
  return async (req,res,next) => {
    try {
      // throw new Error("Bah!"); // tests the catch-block.
      await callback(req,res,next);
    } catch(caughtError) {
      res.render('error',{error: caughtError});
    }
  }
}

app.get('/', asyncHandler(async (req,res) => {
  const gotUsers = await getUsers();
  res.render('index',{title: "Nick's Users", users: gotUsers.users});
}));
// And this can be repeated with app.get('/about',) with some other 
// function than getUsers(), and so on for any route / async lookup
// your app needs.


app.listen(3000, () => console.log('App listening on port 3000!'));