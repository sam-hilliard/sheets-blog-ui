# sheets-blog-ui
A UI for managing a blog stored with Google Sheets.

## Setup

1. Create two .env files (one in the client folder and one in the backend folder).
2. In the client folder's .env add the following line:
`GOOGLE_SHEETS_ID=<id of the database sheet>`
3. In the backend folder's .env add the following line:
`REACT_APP_SHEETS_LINK=<sharable link to the Google Sheet>
4. In the backend folder add a `credentials.json` file storing the service account credentials for the sheets API

## Usage

In the client folder, run `npm start`
This will load the web UI on port 3000.