//dependencies
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

//initalize passport
function initialize(passport, getUserByEmail, getUserById) {

  //authenticate the user
  const authenticateUser = async (email, password, done) => {

    //get the user
    let user = {}
    await getUserByEmail(email).then(function(result) {
        user = result
    })

    //check if the user doesn't exists
    if (user == null) return done(null, false, { message: 'No user with that email' })

    //check if password matches
    if (bcrypt.compareSync(password, user.password)) return done(null, user)

    //else set an error
    else return done(null, false, { message: 'Password incorrect' })
  }

  //configure passport
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize