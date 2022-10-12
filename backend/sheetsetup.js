const { GoogleSpreadsheet } = require('google-spreadsheet')

async function initializeSheet() {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID)

    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    })

    await doc.loadInfo()

    return doc
}

module.exports = {
    initializeSheet
}