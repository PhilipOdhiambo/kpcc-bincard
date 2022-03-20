
const functions = require("firebase-functions")
const { google } = require("googleapis")
const app = require('express')();
const mongoose = require('mongoose')

const inventoryRoutes = require('./routes/inventory');
const reportsRoutes = require('./routes/reports');

// Middlewres
app.use(require('cors')())
app.use(require('body-parser').json())


// Routes
app.get('/', (req, res)=> res.send('Hello'))
app.use('/inventory', inventoryRoutes)
app.use('/reports', reportsRoutes)




// DB connection
require('dotenv/config')
mongoose.connect(process.env.DB_URL, (console.log("DB Connected")))

//app.listen(3000,()=> console.log("Server Connected"))

module.exports.api = functions.https.onRequest(app)