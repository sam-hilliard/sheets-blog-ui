/**
 * Helper methods used to more easily work with
 * Google Sheets API
 */

require('dotenv').config()
const {authenticate} = require('@google-cloud/local-auth')
const {google} = require('googleapis')
const sheetName = 'Sheet1'
const range = 'A:G'

/**
 * 
 * @returns 
 */
async function getRows() {
    const sheets = await _getGoogleSheetClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `${sheetName}!${range}`,
    });

    let rows = res.data.values
    let headers = rows[0]
    rows.shift()    // getting rid of the header rows

    let data = {}
    let slug = ''
    for (let i = 0; i < rows.length; i++) {
        let entry = {}
        for (let j = 0; j < rows[i].length; j++) {
            if (j == 0) {
              slug = rows[i][j]
            }

            entry = {
                [headers[j]]: rows[i][j],
                ...entry
            }
        }

        data = {
          [slug]: entry, 
          ...data
        }
    }

    return {posts: data}
}

/**
 * 
 * @returns 
 */
async function getHeaders() {
  const sheets = await _getGoogleSheetClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!${range}`,
  });

  return res.data.values[0]
}

/**
 * 
 * @param {*} rowID 
 * @returns 
 */
async function getRow(rowID) {
  const rows = await getRows()

  return await rows.posts[rowID]
}

/**
 * 
 * @param {*} data 
 */
async function addRow(data) {
  const sheets = await _getGoogleSheetClient()

  let row = []
  let headers = await getHeaders()

  // ensures data is entered in the correct order
  headers.forEach(header => {
    row.push(data[header])
  })

  let resource = {
    "majorDimension": "ROWS",
    "values": [row]
  }

  // error posting for some reason... resource issue?
  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!${range}`, // Or where you need the data to go 
    valueInputOption: 'RAW',
    resource: resource
  })
}

async function getSlugs() {
  const sheets = await _getGoogleSheetClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!A:A`,
  });

  let slugs = res.data.values
  slugs.shift()

  for (let i = 0; i < slugs.length; i++) {
    slugs[i] = slugs[i][0]
  }

  return slugs
}

/**
 * 
 * @returns 
 */
async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const authClient = await auth.getClient();

    return google.sheets({
      version: 'v4',
      auth: authClient,
    })
}

module.exports = {
    getRows,
    getRow,
    getHeaders,
    addRow,
    getSlugs
}