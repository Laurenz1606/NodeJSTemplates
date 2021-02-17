//dependencies
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

//initialize a passport session
function initialize(passport, getUserByEmail, getUserById) {
  //authenticate a user
  const authenticateUser = async (email, password, done) => {
    //get a user by his email(function in app.js)
    const user = getUserByEmail(email)

    //check if user exists
    if (user == null) return done(null, false, { message: "No user with that email" })

    try {
      //check if password matches else return an error
      if (await bcrypt.compare(password, user.password)) return done(null, user)

      //returning the error
      else return done(null, false, { message: "Password incorrect" })
    } 
    
    //catch errors that occur
    catch (e) {
      return done(e)
    }
  }

  //passport logic
  passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

//export the code1
module.exports = initialize