
import express from 'express'
import {google} from 'googleapis'
import  googleKey from '../google-api-key.js'

const route = express.Router()

// Google client
const auth = new google.auth.GoogleAuth({
  keyFile: "google-api-key.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets"
})

// Create create google sheets api
const gsApi = google.sheets({version:"v4",auth})
const spreadsheetId = '1hWsRZteWKPMZ3v944LtMD7Qc_11Gs28__yE-AxqJKF0'


route.get('/', (req, res) => res.send("Get Reports"))
route.post('/', (req, res) => res.json(req.body))

route.post('/receipts', async (req, res) => {
  let data = await gsApi.spreadsheets.values.update({
    spreadsheetId,
    valueInputOption : 'USER_ENTERED',
    range: 'receipts!A1',
    requestBody: {
      values: req.body.data
    }
  })

  res.status(200).json({message: "success"})
})

route.post('/issues', async (req, res) => {
  let data = await gsApi.spreadsheets.values.update({
    spreadsheetId,
    valueInputOption : 'USER_ENTERED',
    range: 'issues!A1',
    requestBody: {
      values: req.body.data
    }
  })
  
  res.status(200).json({message: "success"})
})


export default route