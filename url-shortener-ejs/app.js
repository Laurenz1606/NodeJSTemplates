//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const mongoose = require('mongoose')

//models
const ShortUrl = require('./models/shortUrl')

//mongoose config
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, useUnifiedTopology: true 
})

//express config
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

//get the starting point
app.get('/', async (req, res) => {

    //find all short urls
    const urls = await ShortUrl.find()

    //render the index page
    res.render('index', { urls: urls})
})

//get the post request for shortening
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

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