//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const jwt = require('jsonwebtoken')

//express config
const app = express()
app.use(express.json())

//refresh tokens array(replaces a database)
let refreshTokens = []

//refresh an accesstoken with a refreshtoken
app.post('/token', (req, res) => {

    //get the refreshtoken
    const refreshToken = req.body.token
    
    //check if token exists
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    
    //verify the token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        
        //generate and send the new access token
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

//delete a refresh token
app.delete('/logout', (req, res) => {

    //delete the token and send the response(204 status)
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

//login post
app.post('/login', (req, res) => {

    //get requested username
    const username = req.body.username
    const user = { name: username }

    //sign the json web token
    const accessToken = generateAccessToken(user)

    //sign an refresh token to refresh an expired jwt token and add it do our "database" here our array
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    //send the tokens to the user
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

//generate a access token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.EXPIRESIN + 's'})
}

//listen to the port
app.listen(process.env.AUTH_PORT, () => console.log(`Auth Part running on Port ${process.env.AUTH_PORT}`))