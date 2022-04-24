
import functions from "firebase-functions"
import { google } from 'googleapis'
import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from "body-parser"
import dotenv from "dotenv/config"

// Import routes
import inventoryRoutes from './routes/inventory.js'
import reportsRoutes from './routes/reports.js'
import preauthRoutes from "./routes/preauths.js"

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Use routes
app.get('/', (req, res)=> res.send('Hello'))
app.use('/inventory', inventoryRoutes)
app.use('/reports', reportsRoutes)
app.use('/preauths', preauthRoutes)




// DB connection
mongoose.connect(process.env.DB_URL, (console.log("DB Connected")))

app.listen(3000,()=> console.log("Server Connected"))

//module.exports.api = functions.https.onRequest(app)