const express = require('express')
const path = require('path')
const cors = require('cors')
const logger = require('morgan');
require('dotenv').config({ path: './config.env' })
const routes = require('./routes/routes')
const connect = require('./db/connectDB')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/api', routes)

//db connect
connect()


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})