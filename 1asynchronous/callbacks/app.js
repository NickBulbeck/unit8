const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views")); // Interesting...
app.use(express.static('public'));

//CALL BACKS
// Remember: to work asynchronously, the function must take (and return) a callback
// that waits in the background until the rest of execution has finished, and then
// it's picked off the top of the call stack and then runs.
function getUsers(cb){
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) return cb(err); // The second parameter for the anonymous function 
                             // is null, because it only uses the error.
    const users = JSON.parse(data);
    return cb(null, users);
  });
}

app.get('/', (req,res) => {
// what's bassed into getUsers() is an anonymous function, that serves as the
// callback. 
  getUsers((err,users) => {
// async methods and functions in node that accept callbacks follow this convention
// generally - that is, they accept an error as the first parameter.
    if(err) {
      res.render('error', {error:err});
    } else {
      res.render('index',{title:"Nick's Users",users:users.users});
// the locals object passed in is based on the data needed in index.pug.
// It needs a nobject called users, and a users object has been passed into 
//this function (the parameter at line 27 above) which itself contains an 
// array of objects called user (you can see this in data.json).
// To my mind, this is a BAD case of the same variable name being used too
// many times.
    }
  })
}); 
// It works OK in this case, where there's one file-read and that's it. But
// when you have several sources of external data, you have to nest the callbacks.
// This rapidly becomes unreadable.

app.listen(3000, () => console.log('App listening on port 3000!'));