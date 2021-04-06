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

// PROMISES, but also async/await - that's because an async/await function has to consume a Promise
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
// WITH CALLBACKS:
// app.get('/', (req,res) => {
//   getUsers((err, users)=>{
//     if(err){
//       res.render('error', {error:err});
//     } else {
//       res.render('index', {title: "Users", users: users.users})
//     }
//   });
// }); 
// WITH PROMISES ALONE:
// app.get('/', (req,res) => {
//   getUsers()
//     .then((users)=> {
//       res.render('index', {title: "Users", users: users.users});
//     })
//     .catch((err)=> {
//       res.render('error', {error: err});
//     });
// }); 

// AND NOW: async/await.
// One advantage of async/await arises when an error occurs in a long chain of async functions. Even with Promises,
// it can be hard to spot where the error occurred. The syntax is a lot more like ordinary synchronous code.
// The 'await' keyword can only be used inside an async function; so we need to prefix the callback for app.get() 
// with 'async', thus:
app.get('/', async (req,res) => { // 'async' will wrap the function in a Promise if it's not one already.
  try {
    const users = await getUsers(); // getUsers() already returns a Promise. Async/await can be more complex
                                    // to use if you're just testing it out with a setTimeout or similar. 
                                    // It's like calling a Promise's .then() method - execution pauses while
                                    // getUsers() runs. Finally, async/await needs try/catch to catch errors.
    // const somethingElse = await doSomethingElse();
    // const etc = await etc();
    // throw new Error("Foadyb"); // again, use this to test the error-handling.
    res.render('index', {title: "Users", users: users.users});
  } catch(foadybError) {
    res.render('error', {error: foadybError});  // catch implicitly fields an error, and indeed is only ever called
                                                // when there is one. And remember that error.pug expects a variable
                                                // called 'error'.
  }

});

app.listen(3000, () => console.log('App listening on port 3000!'));