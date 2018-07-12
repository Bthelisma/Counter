// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
var app = express();
var session = require('express-session')
var bodyParser = require('body-parser');

// use it!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'codingdojo' }))
    // static content
app.use(express.static(path.join(__dirname, "./static")));
app.use(express.static(path.join(__dirname, 'static')));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


// root route to render the index.ejs view
var count = 0;

app.get('/', function(request, response) {
    count++;
    response.render('index', { count: count })
});

//using post because a form is invovled for the 'double' button
app.post('/one', function(req, res) {
    if (req.session.count) {
        req.session.count++;
    } else { req.session.count = 1; }
    res.redirect('/');
});

app.post('/double', function(request, response) {
    count++;
    response.redirect('/');
});

//using post because a form is invovled for the 'clear' button
app.post('/delete', function(request, response) {
    count = 0;
    response.redirect('/')
});



// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})