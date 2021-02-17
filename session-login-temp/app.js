//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')

//express config
const app = express()
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))