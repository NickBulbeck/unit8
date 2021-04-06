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
// see the flow of logic fae the outset.

function getUsers(){
// In order to run inside .then(), getUsers() must return a promise.
// The Promise takes a callback function that is executed when the
// Promise is first created, and this function performs an asynchronous
// operation. We should define both what happens if the action is 
// successful, and what should happen if it fails.
// To this end, the callback accepts two parameters that are created 
// automatically by new Promise() in the same way that the event 
// object is created automatically by element.addEventListener().
// The parameters are resolve and reject.
// Whereas 'event' is an object whose properties we use, 'resolve' and 'reject' are
// functions that we call.
 
  return new Promise((resolve,reject) => { // So, create new Promise();
                                           // then add the () => {} inside;
                                           // then the resolve,reject parameters.
    fs.readFile('data.json','utf-8', (err,data) => { // That's how fs.readFile works.
      if(err) {        // if fs.readFile() returns an error, then use the 'reject'
        reject(err);   // function passed in as a paramenter, and pass IT the error
                       // created by fs.readFile()
       } else {
        const readInUsers = JSON.parse(data);  // 'data' being the argument passed to
                                                // fs.readFile, and now populated with a
                                                // string that needs JSON.parse-ing.
        resolve(readInUsers); // Now, we call the resolve() function created by the
                              // Promise constructor and labelled as 'resolve' when we
                              // set up the Promise callback - and in turn, readable in
                              // the fs.readFile() callback because the latter is inside the
                              // Promise callback's scope. We use the name readInUsers just
                              // as a label for the output from JSON.parse, so that we can
                              // pass it into resolve(). We could equally have done
                              // resolve(JSON.parse(data));
       } // resolve() returns a Promise, but with the specific data, Promise.readInUsers,
         // built in and accessible in the next step.
    });
  }); // 

}

app.get('/', (req,res) => {
  getUsers() // getUsers() now returns a Promise, and we can chain a .then() on the end
    .then((readInUsers2) => { // readInUsers2 is foadyb to this context. It COBOL REDEFINES
                              // readInUsers from inside getUsers() above.
      res.render('index',{title: "Nick's Users", users: readInUsers2.users});
            // Let's be clear where all the 'users' come from here. In index.pug,
            // it expects a variable called title and another called users. That's where
            // the keys in the object (title: and users:) come from. readInUsers2 is the
            // foadby name I gave to the data created with the promise passed in from 
            // getUsers(). That in turn is the JSON contents of data.json - which is an array
            // called 'users', and that's where the final 'users' comes from.
    })  // .then accepts a function; we've passed it an anonymous one here.
        // The assumption is that it will be passed some data; obviously, then,
        // the function does something with that data. 
        //
    .catch((autoError) => {
      res.render('error',{title: "Nick's Users", error: autoError})
    })    
                // .catch() also accepts a callback, because .catch is
                // called when there's been an error (which, like the event in
                // addEventListener(), is generated and passed in automatically
                // behind the scenes. We give it a label so we can reference it
                // in the .catch() callback we're written here. The purose of 
                // this callback is, obviously, to do something with the error.
}); 


app.listen(3000, () => console.log('App listening on port 3000!'));