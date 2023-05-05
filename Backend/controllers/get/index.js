const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const popup = require('../../data/popup.json')
const popupContent = require('../../data/popupContent.json')
const exercise = require('../../data/exr.json')
const router = express.Router()

router.route('/getPopup').get((req, res, next) => {
    res.send({ popup, popupContent })
})

router.route('/getExercise').get((req, res, next) => {
    res.send({ exercise })
})
router.route('/getDirIB').get((req, res, next) => {
    const mapDir = fs.readdirSync(path.join('./data/Contains'))
    res.send(mapDir)
})
router.route('/getDirTopic/:id').get((req, res, next) => {
    const mapDir = fs.readdirSync(path.join(`./data/Contains/${req.params.id}`))
    res.send(mapDir)
})
router.route('/getDirTopics/:ib/:topic').get((req, res, next) => {
    const mapDir = fs.readdirSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}`))
    res.send(mapDir)
})
router.route('/getIndex/:ib/:topic/:name').get((req, res, next) => {
    const readFile = fs.readFileSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))

    const index = JSON.parse(readFile).length
    res.send(String(index))
})
router.route('/getExercise/:ib/:topic/:name').get((req, res, next) => {
 
    if (fs.existsSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))){
        const data = fs.readFileSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))

        res.send(JSON.parse(data))
    }else{
        res.send('fail')
    }
  
})

module.exports = router