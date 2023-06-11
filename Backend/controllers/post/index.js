const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const exercise = fs.readFileSync(path.join('./data/exr.json'))
const linkExercise = path.join('./data/exr.json')
const API_IMG = process.env.API_IMG

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    const ib = req.ib
    const dirName = req.topic

    const nameTopic = req.nametopic
    if (!fs.existsSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/formula${req.queryId}`))) {
      fs.mkdirSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/formula${req.queryId}`))
    }
    if (!fs.existsSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/mark${req.queryId}`))) {
      !fs.mkdirSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/mark${req.queryId}`))
    }

    // if (!fs.existsSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/question${req.queryId}`))) {
    //   fs.mkdirSync(path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/question${req.queryId}`))
    // }


    const dataPath = file.fieldname === 'formula' ? path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/formula${req.queryId}`) :
      file.fieldname === 'mark' ? path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img/mark${req.queryId}`) :
        file.fieldname === 'question' ? path.join(`./data/Contains/${ib}/${dirName}/${nameTopic}/img`) :
          ''
    if (file.fieldname === 'formula') {

      cb(null, dataPath)
    } else if (file.fieldname === 'question') {
      cb(null, dataPath)
    } else if (file.fieldname === 'mark') {
      cb(null, dataPath)
    } else {
      cb(new Error)
    }

  },

  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname)

    if (file.fieldname === 'formula') {
      cb(null, file.originalname)
    } else if (file.fieldname === 'question') {
      cb(null, 'question' + req.queryId + ext)
    } else if (file.fieldname === 'mark') {
      cb(null, file.originalname)
    } else {
      cb(new Error)
    }
  }
})

const uploadMiddleware = multer({ storage: storage }).fields([
  { name: "formula", maxCount: undefined },
  { name: "mark", maxCount: undefined },
  { name: "question", maxCount: 1 }

]);

router.route('/addcontenttopic/:ib/:topic/:nametopic').post((req, res, next) => {

  req.ib = req.params.ib
  req.topic = req.params.topic
  req.nametopic = req.params.nametopic
  req.queryId = req.query.id

  uploadMiddleware(req, res, (err) => {

    const { question, formula, mark } = req.files
    console.log(mark)
    const readFile = fs.readFileSync(path.join(`./data/Contains/${req.ib}/${req.topic}/${req.nametopic}/data.json`))
    const data = JSON.parse(readFile)
    const questionURl = API_IMG + '/' + req.ib + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'question' + req.queryId + '.png'
    const formulaURl = API_IMG + '/' + req.ib + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'formula' + req.queryId
    const markURl = API_IMG + '/' + req.ib + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'mark' + req.queryId
    let wr
    data.forEach(item => {
      if (questionURl !== item.question) {

      }

    })
    const newData = [...data, { id: req.queryId, question: questionURl, mark: markURl, formula: formulaURl, type: req.body.type }]
 
    const wrFile = path.join(`./data/Contains/${req.ib}/${req.topic}/${req.nametopic}/data.json`)
    wr = fs.writeFileSync(wrFile, JSON.stringify(newData), 'utf8')
    if (wr) {
      return res.send('success');
    } else {
      return res.send('failure')
    }


  });


})







router.route('/addTopic').post((req, res, next) => {
  const dataPath = path.join(`./data`)
  const { IB, Topic, title, description } = req.body

  const jsonExercise = JSON.parse(exercise)
  jsonExercise[IB][Topic].push({ title, content: description })
  if (fs.existsSync(`${dataPath}/Contains/${title}`)) {
    res.send('failure')
  } else {
    fs.writeFileSync(linkExercise, JSON.stringify(jsonExercise), 'utf8')
    fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${title}`)
    fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${title}/img`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${title}/img/question`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${title}/img/mark`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${title}/img/formula`)
    fs.writeFileSync(`${dataPath}/Contains/${IB}/${Topic}/${title}/data.json`, '[]')
    res.send('sucsees')
  }
})




module.exports = router