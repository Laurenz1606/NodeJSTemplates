//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const jwt = require('jsonwebtoken')

//express config
const app = express()
app.use(express.json())

//posts array
const posts = [
    {
        username: "Tom",
        title: "Toms 1"
    },
    {
        username: "Jerry",
        title: "Jerrys 2"
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

//login post
app.post('/login', (req, res) => {

    //get requested username
    const username = req.body.username
    const user = { name: username }

    //sign the json web token
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

//authToken function
function authenticateToken(req, res, next) {

    //get the token from the header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    //check if token exists
    if(token == null) return res.sendStatus(401)

    //verify user
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {

        //user token is wrong
        if (err) return res.sendStatus(403)

        //set the user to the request.user
        req.user = user
        next()
    })
}

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))