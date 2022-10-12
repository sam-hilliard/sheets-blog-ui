require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { initializeSheet } = require('./sheetsetup')

const app = express()
const PORT = 3001

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// initializing google spreadsheet use
doc = initializeSheet()

app.get('/', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`)
})