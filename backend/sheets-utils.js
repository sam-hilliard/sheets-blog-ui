require('dotenv').config()
const {authenticate} = require('@google-cloud/local-auth')
const {google} = require('googleapis')
const sheetName = 'Sheet1'
const range = 'A:G'

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

async function getRow(rowID) {
  const rows = await getRows()

  return await rows.posts['next-post']
}

async function addRow(data) {
  const sheets = await _getGoogleSheetClient()

  let row = []
  for (const key in data) {
    data
  }

  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `${sheetName}!${range}`, // Or where you need the data to go 
    valueInputOption: 'RAW',
    resource: row
  })

}

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
    getRow
}