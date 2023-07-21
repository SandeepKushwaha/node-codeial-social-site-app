const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session-cookies
const session = require('express-session');
const passport = require('passport');
// used for user authentication
const passportLocal = require('./config/passport-local-strategy');

// set up middleware that parses all the urlencoded bodies.
app.use(express.urlencoded({
    extended: true
}));

// set up cookie-parser
app.use(cookieParser());

// set up static file access
app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and script form sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/', require('./routes/index'));

app.listen(port, function (error) { 
    if (error) {
        console.log(`Error in running the server: ${error}`);
    }

    console.log(`Server is running on port: ${port}`);
});