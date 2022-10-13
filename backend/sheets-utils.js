require('dotenv').config()
const {authenticate} = require('@google-cloud/local-auth')
const {google} = require('googleapis')
const sheetName = 'Sheet1'
const range = 'A:G'

async function getRows(limit) {
    const sheets = await _getGoogleSheetClient()
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `${sheetName}!${range}`,
    });

    let rows = res.data.values;
    rows.shift()    // getting rid of the header rows

    return rows
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
    getRows
}