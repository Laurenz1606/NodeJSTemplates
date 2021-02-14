//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')

//express config
const app = express()

app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))