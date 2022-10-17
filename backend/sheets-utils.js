/**
 * Helper methods used to more easily work with
 * Google Sheets API
 */

require('dotenv').config()
const {authenticate} = require('@google-cloud/local-auth')
const {google} = require('googleapis')
const sheetName = 'Sheet1'
const range = 'A:F'

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

  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!${range}`,
    valueInputOption: 'RAW',
    resource: resource
  })
}

/**
 * 
 * @param {*} rowID 
 * @param {*} data 
 */
async function updateRow(rowID, data) {
  const sheets = await _getGoogleSheetClient()
  const slugs = await getSlugs()
  const rowNum = slugs.indexOf(rowID) + 2

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
  
  sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!A${rowNum}:F5`, 
    valueInputOption: 'RAW',
    resource: resource
  })
}

async function deleteRow(rowID) {
  const sheets = await _getGoogleSheetClient()
  const slugs = await getSlugs()

  if (!slugs.includes(rowID)) {
    return {error: `Slug, ${rowID}, does not exist`}
  }

  const rowNum = slugs.indexOf(rowID) + 2
  
  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!A${rowNum}:F5`, 
  })

  return {message: `Successfully deleted ${rowID}`}
}

/**
 * 
 * @param {*} data 
 * @param {*} isCreate 
 * @returns 
 */
async function verifyPostData(data, isCreate) {
  const headers = await getHeaders()
  const slugs = await getSlugs()

  // can't create a field with a duplicate slug (slug must be unique)
  if (isCreate) {
    if (slugs.includes(data.slug)) {
      return {error: `Slug name, ${data.slug}, already exists.`}
    }
  }

  // insufficient number of fields entered
  if (Object.keys(data).length < headers.length) {
    return {error: 'Missing one or more fields.'}
  }

  // checking for invalid fields
  for (let key in data) {
    if (!headers.includes(key) || !data[key]) {
        return {error: `Invalid field enterd: ${key}.`}
    }
  }

  return data
}

/**
 * 
 * @returns 
 */
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
    addRow,
    updateRow,
    deleteRow,
    verifyPostData
}