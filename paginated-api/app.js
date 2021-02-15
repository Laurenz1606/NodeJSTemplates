//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const cors = require('cors')

//express config
const app = express()
app.use(express.json())
app.use(cors())

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))