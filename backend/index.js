const express = require('express')
const cors = require('cors')
const { getRows, getRow, addRow, verifyPostData } = require('./sheets-utils')

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
        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({error: `Post with slug, ${req.params.id}, does not exist.`})
        }
    }).catch(err => {
        res.status(500).json(err)
    })
})

// posting a new entry
app.post('/', (req, res) => {

    // getting headers for error checking
    // getHeaders().then(headers => {

    //     if (Object.keys(req.body) < headers.length) {
    //         res.status(400).json({error: 'Missing one or more fields.'})
    //     }
        
    //     for (let key in req.body) {
    //         if (!headers.includes(key) || !req.body[key]) {
    //             res.status(400).json({error: `Missing required field ${key}.`})
    //         }
    //     }

    //     getSlugs().then(slugs => {
    //         if (slugs.includes(req.body.slug)) {
    //             res.status(400).json({error: `Slug name, ${req.body.slug}, already exists.`})
    //         } 
            
    //         addRow(req.body).then(() => {
    //             res.status(200).json(req.body)
    //         }).catch(() => {
    //             res.status(500).json({error: 'Could not add entry'})
    //         })
    //     })
        

    // }).catch(err => {
    //     res.status(500).json({error: 'Error checking validity of data.'})
    // })

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

})

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}.`)
})