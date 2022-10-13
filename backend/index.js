const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getRows } = require('./sheets-utils')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// initializing google spreadsheet use

app.get('/', (req, res) => {
    getRows(0).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`)
})