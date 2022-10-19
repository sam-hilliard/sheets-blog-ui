const express = require('express')
const cors = require('cors')
const { getRows, getRow, addRow, updateRow, deleteRow, verifyPostData } = require('./sheets-utils')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// get route for getting every post
app.get('/', (req, res) => {
    getRows().then(data => {
        res.status(200).json(data)
    }).catch(() => {
        res.status(500).json({error: 'Unable to fetch posts.'})
    })
})

// get route for getting a single post
app.get('/:id', (req, res) => {
    getRow(req.params.id).then(data => {
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({error: `Post with slug, ${req.params.id}, does not exist.`})
        }
    }).catch(() => {
        res.status(500).json({error: 'Unable to fetch post information.'})
    })
})

// posting a new entry
app.post('/', (req, res) => {
    verifyPostData(req.body, true).then(message => {
        if (Object.keys(message).includes('error')) {
            res.status(400).json(message)
        } else {
            addRow(req.body).then(() => {
                res.status(200).json(req.body)
            }).catch(() => {
                res.status(500).json({error: 'Could not add entry'})
            })
        }
    }).catch(() => {
        res.status(500).json({error: 'Error checking validity of data.'})
    })
})

// updating an entry
app.post('/:id', (req, res) => {
    verifyPostData(req.body, false).then(message => {
        if (Object.keys(message).includes('error')) {
            res.status(400).json(message)
        } else {
            updateRow(req.params.id, req.body).then(() => {
                res.status(200).json(req.body)
            }).catch(() => {
                res.status(500).json({error: `Could not update entry of id ${req.params.id}`})
            })
        }
    }).catch(() => {
        res.status(500).json({error: 'Error checking validity of data.'})
    })
})

// deleting an entry
app.post('/delete/:id', (req, res) => {
    deleteRow(req.params.id).then(response => {
        if (Object.keys(response).includes('error')) {
            res.status(400).json(response)
        }
        res.status(200).json(response)
    }).catch(() => {
        res.status(500).json({error: `Failed to delete ${req.params.id}`})
    })
})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`)
})