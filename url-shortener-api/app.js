//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//models
const ShortUrl = require('./models/shortUrl')

//mongoose config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
})

//express config
const app = express()
app.use(express.json())
app.use(cors())

//get all shortened urls
app.get('/all', async (req, res) => {

    //find all short urls
    const urls = await ShortUrl.find()

    //render the index page
    res.json({ shortenedUrls: urls })
})

//create a shortened url
app.post('/create', async (req, res) => {

    //make the database entrie and send it to the user
    const newShort = await ShortUrl.create({ full: req.body.fullUrl })
    res.json(newShort)
})

//get info of a specific url
app.get('/info/:url', async (req, res) => {

    //find the url by the req params 
    const shorted = await ShortUrl.findOne({ short: req.params.url })

    //test if the url is null
    if (shorted == null) return res.sendStatus(404)

    //send the infos
    res.json({ info: shorted })
})

//make the redirection
app.get('/:url', async (req, res) => {

    //find the url by the req params 
    const shorted = await ShortUrl.findOne({ short: req.params.url })

    //test if the url is null
    if (shorted == null) return res.sendStatus(404)

    //add one to the clicks and save them
    shorted.clicks++
    shorted.save()

    //redirect to the long url
    res.redirect(shorted.full)
})

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))