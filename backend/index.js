const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getRows, getRow } = require('./sheets-utils')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// initializing google spreadsheet use

// get route for getting every post
app.get('/', (req, res) => {
    getRows().then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// get route for getting a single post
app.get('/:id', (req, res) => {
    getRow(req.params.id).then(data => {
        res.status(200).json(data)
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`)
})