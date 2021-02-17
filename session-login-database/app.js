//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

//models
const User = require('./models/user')

//passport logic
const initializePassport = require('./passport-config')
initializePassport(
    passport,
    async email => {
        let usr = await User.find({ email: email })
        return usr[0]
    },
    async id => await User.findById(id)
)

//express config
const app = express()
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.json())
    
    
//mongoose config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
})

//get the dashboard
app.get('/', checkAuthenticated, async (req, res) => {
    try {

        //get the user and render the dashboard
        let usr = await req.user
        res.render('index.ejs', { name: usr.name })
    } catch {

        //when an error occur redirect to login
        res.redirect('/login')
    }
})

//get the login
app.get('/login', checkNotAuthenticated, (req, res) => {

    //render the login page
    res.render('login.ejs')
})

//get the post for login(with passport middleware)
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {

    //configure the passport middleware
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

//get the register
app.get('/register', checkNotAuthenticated, (req, res) => {

    //render the register page
    res.render('register.ejs')
})

//post the register
app.post('/register', checkNotAuthenticated, async (req, res) => {

    //hash the users password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    let usr = await User.find({ email: req.body.email })

    //check if email exits
    if (usr.length == 0) {

        //create user
        const user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })
        const newUser = await user.save()
        res.redirect('/login')
    } else {

        //redirect to the register page with an error
        res.render('register.ejs', {
            messages: {
                error: "Email alredy taken"
            }
        })
    }
})

//delete for logout
app.delete('/logout', (req, res) => {

    //log the user out
    req.logOut()

    //redirect the user
    res.redirect('/login')
})

//check if a user is auth middleware
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        //go to next middleware
        return next()
    }

    //redirect to login
    res.redirect('/login')
}

//check if a user is not auth middleware
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {

        //redirect to dashbord
        return res.redirect('/')
    }

    //go to next middleware
    next()
}

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))