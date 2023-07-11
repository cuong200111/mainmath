const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const getEnpoint = require('./controllers/get')
const postEnpoint = require('./controllers/post')
const deleteEnpoint = require('./controllers/delete')
const imgStatic = path.join('./data/Contains')
const app = express()
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/imgdata', express.static(imgStatic))
app.use('/', getEnpoint)
app.use('/', postEnpoint)
app.use('/', deleteEnpoint)



app.listen(44000)
