//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

//create a user array(DO NOT USE IN PRODUCTION)
const users = []

//passport-config
const initializePassport = require('./passport-config')
initializePassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id),
)

//express config
const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//get the dashboard
app.get('/', checkAuthenticated, (req, res) => {

    //render the dashboard page and pass the username
    res.render('index.ejs', { name: req.user.name})
})

//get the login
app.get('/login', checkNotAuthenticated, (req, res) => {

    //render the login page
    res.render('login.ejs')
})

//loging in the user
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {

    //pass passport the variables
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

//get the register
app.get('/register', checkNotAuthenticated, (req, res) => {

    //render the register page
    res.render('register.ejs')
})

//post the user
app.post('/register', checkNotAuthenticated, (req, res) => {

    //hash their password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    const user = users.find(currUser => currUser.email === req.body.email)
    if(user !== undefined) {
        req.flash('error', 'Email alredy taken')
        res.redirect('/register')
    }
    else {

        //append them to the user array
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
    
        //redirect them to the login
        res.redirect('/login')
    }
})

//delete the session
app.delete('/logout', (req, res) => {

    //logout the user and redirect to login
    req.logOut()
    res.redirect('/login')
})

//middleware to check if user is authenticated
function checkAuthenticated(req, res, next) {

    //check if user is authenticated
    if (req.isAuthenticated()) {

        //go to next
        return next()
    }

    //redirect them to the login
    res.redirect('/login')
}

//middleware to check if user is not authenticated
function checkNotAuthenticated(req, res, next) {

    //check if user is authenticated
    if (req.isAuthenticated()) {

        //redirect them to their dashboard
        return res.redirect('/')
    }

    //goto next
    next()
}

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))