const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const exercise = fs.readFileSync(path.join('./data/exr.json'))
const linkExercise = path.join('./data/exr.json')
const API_IMG = process.env.API_IMG
const API_IMG_PRIVATE = process.env.API_IMG_PRIVATE
const conSql = require('../../models/index')
const jwt = require('jsonwebtoken')
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
  const strTitle = title.trim()
  const jsonExercise = JSON.parse(exercise)
  jsonExercise[IB][Topic].push({ title: strTitle, content: description })
  if (fs.existsSync(`${dataPath}/Contains/${strTitle}`)) {
    res.send('failure')
  } else {
    fs.writeFileSync(linkExercise, JSON.stringify(jsonExercise), 'utf8')
    fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}`)
    fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}/img`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}/img/question`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}/img/mark`)
    // fs.mkdirSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}/img/formula`)
    fs.writeFileSync(`${dataPath}/Contains/${IB}/${Topic}/${strTitle}/data.json`, '[]')
    res.send('sucsees')
  }
})


router.route('/loginPrivate').post((req, res, next) => {
  const { username, password } = req.body

  try {
    conSql.query('select * from userprivate', (err, result) => {
      const findAccount = result.find(user => {
        if (user) {
          if (user.account !== username || user.password !== password) {
            return false
          } else {
            return user
          }
        } else { return false }


      })
      if (findAccount) {
        const token = jwt.sign(findAccount.account, JSON.stringify({ account: findAccount.account, password: findAccount.password }))
        conSql.query(`update userprivate set token = '${token}' where account='${findAccount.account}'`, (err) => {
          console.log(err);
        })
        res.send({ msg: "Đăng nhập thành công", account: findAccount.account, password: findAccount.password, token, activeLogin: true })
      } else {
        res.send({ msg: "Tài khoản hoặc mật khẩu không đúng", account: username, activeLogin: false })
      }

    })
  } catch (error) {
    if (error) {
      res.status(500).send('server error')
    }
  }
})


router.route('/registerPrivate').post((req, res, next) => {
  const { username, password } = req.body
  try {
    conSql.query('select * from userprivate', (err, result) => {
      const findDuplicate = result.find((item, index) => {
        if (item) {
          return item.account == username
        } else {
          return false
        }

      })
      if (findDuplicate) {
        res.send({ msg: 'Tài khoản đã tồn tại', activeUser: true })
      } else {
        conSql.query(`insert into userprivate(account, password,token) values ('${username}','${password}','')`, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send({ msg: 'lỗi sql' })
          } else {
            fs.mkdirSync(path.join(`./dataPrivate/${username}`), { recursive: true })
            if (fs.existsSync(path.join(`./dataPrivate/${username}`))) {
              fs.mkdirSync(path.join(`./dataPrivate/${username}/Exam`), { recursive: true })
              fs.mkdirSync(path.join(`./dataPrivate/${username}/Topic`), { recursive: true })
              fs.writeFileSync(path.join(`./dataPrivate/${username}/data.json`), `{"Exam":[],"Topic":[]}`)
            }
            res.send({ msg: 'Đăng ký thành công', activeUser: false })
          }
        })
      }
    })
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(500).send('server error')
    }
  }

})
router.route('/addTopicPrivate').post((req, res, next) => {
  const { nameAccount, title, description, Topic } = req.body
  const urlData = path.join('./dataPrivate', nameAccount)
  const dataJson = JSON.parse(fs.readFileSync(`${urlData}/data.json`))
  if (fs.existsSync(urlData)) {
    const findData = Array.isArray(dataJson[Topic]) ? dataJson[Topic].find(item => {
      if (item) {
        return item.title === title
      } else {
        return false;
      }

    }) : null
    if (Boolean(findData)) {
      res.send(`${title} trong ${Topic} đã tồn tại`)
    } else {
      Array.isArray(dataJson[Topic]) ? dataJson[Topic].push({ title, description }) : null
      fs.writeFileSync(`${urlData}/data.json`, JSON.stringify(dataJson), 'utf8')
      if (fs.existsSync(`${urlData}/${Topic}`)) {
        const newPath = `${urlData}/${Topic}`
        fs.mkdirSync(`${newPath}/${title}`, { recursive: true })
        if (fs.existsSync(`${newPath}/${title}`)) {
          fs.mkdirSync(`${newPath}/${title}/img`)
          fs.writeFileSync(`${newPath}/${title}/data.json`, `[]`)
          res.send(`Thêm thành công dữ liệu`)
        }

      }

    }
  }
})












const storage2 = multer.diskStorage({

  destination: (req, file, cb) => {
    const nameaccount = req.nameaccount
    const dirName = req.topic
    const nameTopic = req.nametopic
    if (!fs.existsSync(path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/formula${req.queryId}`))) {
      fs.mkdirSync(path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/formula${req.queryId}`))
    }
    if (!fs.existsSync(path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/mark${req.queryId}`))) {
      fs.mkdirSync(path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/mark${req.queryId}`))
    }




    const dataPath = file.fieldname === 'formula' ? path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/formula${req.queryId}`) :
      file.fieldname === 'mark' ? path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img/mark${req.queryId}`) :
        file.fieldname === 'question' ? path.join(`./dataPrivate/${nameaccount}/${dirName}/${nameTopic}/img`) :
          ''
    console.log(dataPath);
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

const uploadMiddleware2 = multer({ storage: storage2 }).fields([
  { name: "formula", maxCount: undefined },
  { name: "mark", maxCount: undefined },
  { name: "question", maxCount: 1 }

]);
router.route('/addcontenttopicSingle/:nameaccount/:topic/:nametopic').post((req, res, next) => {

  req.nameaccount = req.params.nameaccount
  req.topic = req.params.topic
  req.nametopic = req.params.nametopic
  req.queryId = req.query.id

  uploadMiddleware2(req, res, (err) => {
    console.log(err);
    const { question, formula, mark } = req.files
    const readFile = fs.readFileSync(path.join(`./dataPrivate/${req.nameaccount}/${req.topic}/${req.nametopic}/data.json`))

    const data = JSON.parse(readFile)
    const questionURl = API_IMG_PRIVATE + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'question' + req.queryId + '.png'
    const formulaURl = API_IMG_PRIVATE + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'formula' + req.queryId
    const markURl = API_IMG_PRIVATE + '/' + req.topic + '/' + req.nametopic + '/' + 'img' + '/' + 'mark' + req.queryId
    let wr
    data.forEach(item => {
      if (questionURl !== item.question) {

      }

    })
    const newData = [...data, { id: req.queryId, question: questionURl, mark: markURl, formula: formulaURl, type: req.body.type }]

    const wrFile = path.join(`./dataPrivate/${req.nameaccount}/${req.topic}/${req.nametopic}/data.json`)
    wr = fs.writeFileSync(wrFile, JSON.stringify(newData), 'utf8')
    if (wr) {
      return res.send('success');
    } else {
      return res.send('failure')
    }


  });


})
module.exports = router
