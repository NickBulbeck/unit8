const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req,res) => {
//   getUsers((err, users)=>{
//     if(err){
//       res.render('error', {error:err});
//     } else {
//       res.render('index', {title: "Users", users: users.users})
//     }
//   });
// }); 

// And Now: the same idea, usig promises
// First tip: it's an idea to write what is, here, the app.get() part first - that is,
// function().then().then()/*etc*/.catch(). Kind of like top-down design - you can 
// see the flow of logic fae the outsetl.

function getUsers(){
// In order to run inside .then(), getUsers() must return a promise.
  return new Promise() // 2'03"
}

app.get('/', (req,res) => {
  getUsers()
    .then()
    .catch()
}); 


app.listen(3000, () => console.log('App listening on port 3000!'));