//dotenv config
require('dotenv').config()

//dependencies
const express = require('express')
const cors = require('cors')

//express config
const app = express()
app.use(express.json())
app.use(cors())

//create posts array (replaces a database)
const posts = [
    { id: 1, name: 'Post 1' },
    { id: 2, name: 'Post 2' },
    { id: 3, name: 'Post 3' },
    { id: 4, name: 'Post 4' },
    { id: 5, name: 'Post 5' },
    { id: 6, name: 'Post 6' },
    { id: 7, name: 'Post 7' },
    { id: 8, name: 'Post 8' },
    { id: 9, name: 'Post 9' },
    { id: 10, name: 'Post 10' },
    { id: 11, name: 'Post 11' },
    { id: 12, name: 'Post 12' },
    { id: 13, name: 'Post 13' },
    { id: 14, name: 'Post 14' },
    { id: 15, name: 'Post 15' },
    { id: 16, name: 'Post 16' },
    { id: 17, name: 'Post 17' },
    { id: 18, name: 'Post 18' },
]

//create users array (replaces a database)
const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
    { id: 5, name: 'User 5' },
    { id: 6, name: 'User 6' },
    { id: 7, name: 'User 7' },
    { id: 8, name: 'User 8' },
    { id: 9, name: 'User 9' },
    { id: 10, name: 'User 10' },
    { id: 11, name: 'User 11' },
    { id: 12, name: 'User 12' },
    { id: 13, name: 'User 13' },
    { id: 14, name: 'User 14' },
    { id: 15, name: 'User 15' },
    { id: 16, name: 'User 16' },
    { id: 17, name: 'User 17' },
    { id: 18, name: 'User 18' },
]

//get the useres(paginated)
app.get('/users', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults)
})

//get the posts(paginated)
app.get('/posts', paginatedResults(posts), (req, res) => {
    res.json(res.paginatedResults)
})

//make the middleware function
function paginatedResults(model) {
    return (req, res, next) => {

        //get the page an the limit query to a variable
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
    
        //convert the limit and page for a zero based array
        const startIndex = (page - 1) * limit
        const endIndex = page* limit
        
        //make an result object
        const results = {}
        
        //clac next result
        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        //clac previous result
        if (startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
    
        }
        
        //slice the array from start to end index
        results.results = model.slice(startIndex, endIndex)
    
        //set the paginated object to a variable in the response
        res.paginatedResults = results
        next()
        
    }
}

//listen to the port
app.listen(process.env.PORT, () => console.log(`Part running on Port ${process.env.PORT}`))