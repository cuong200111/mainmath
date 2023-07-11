const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const popup = require('../../data/popup.json')
const popupContent = require('../../data/popupContent.json')
const exercise = require('../../data/exr.json')
const sqlConnect = require('../../models')
const router = express.Router()
router.route('/getPopup').get((req, res, next) => {
    res.send({ popup, popupContent })
})

router.route('/getExercise').get((req, res, next) => {
    res.send({ exercise })
})


router.route('/getExerciseSingle/:account').get((req, res, next) => {

    const exerciseSingle = require(`../../dataPrivate/${req.params.account}/data.json`)
    res.send({ exerciseSingle })
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

    const index = JSON.parse(readFile).length - 1
    res.send(String(index))
})
router.route('/getExercise/:ib/:topic/:name').get((req, res, next) => {

    if (fs.existsSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))) {
        const data = fs.readFileSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))

        res.send(JSON.parse(data))
    } else {
        res.send('fail')
    }

})
router.route('/getExerciseSingle/:account/:topic/:name').get((req, res, next) => {

    if (fs.existsSync(path.join(`./dataPrivate/${req.params.account}/${req.params.topic}/${req.params.name}/data.json`))) {
        console.log('tim thaasy');
        const data = fs.readFileSync(path.join(`./dataPrivate/${req.params.account}/${req.params.topic}/${req.params.name}/data.json`))

        res.send(JSON.parse(data))
    } else {
        res.send('fail')
    }

})


router.route('/getDeleteExercise/:ib/:topic/:name').get((req, res, next) => {

    if (fs.existsSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))) {
        const data = fs.readFileSync(path.join(`./data/Contains/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))

        res.send(JSON.parse(data))
    } else {
        res.send('fail')
    }

})
router.route('/getDeleteSingleExercise/:ib/:topic/:name').get((req, res, next) => {

    if (fs.existsSync(path.join(`./dataPrivate/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))) {
        const data = fs.readFileSync(path.join(`./dataPrivate/${req.params.ib}/${req.params.topic}/${req.params.name}/data.json`))
        res.send(JSON.parse(data))
    } else {
        res.send('fail')
    }

})

router.get('/getArrExercises/:id/:paths', (req, res) => {
    const { paths } = req.params
    const pathPng = path.join(`./data/Contains/${paths.slice(paths.lastIndexOf('imgdata') + 8)}`)
    const data = fs.readdirSync(pathPng)
    const mapData = data.map(item => item = paths + '/' + item)
    res.send(mapData)
})
router.get('/getArrExercisesSingle/:id/:paths', (req, res) => {
    const { paths ,id} = req.params
    const pathPng = path.join(`./dataPrivate/${id}/${paths.slice(paths.lastIndexOf('shareimg') + 8)}`)
    const data = fs.readdirSync(pathPng)
    const mapData = data.map(item => item = paths + '/' + item)
    res.send(mapData)
})

router.get('/getProfile', (req, res) => {
    const authHeader = req.headers.authorization
    try {
        if (authHeader) {
            sqlConnect.query('select * from userprivate', (err, result) => {
                const findProfile = result.find(user => user.token === authHeader)
                res.send({ account: findProfile.account })
            })

        } else {
            res.status(400).send({ msg: 'token not found' })
        }
    } catch (error) {
        if (error) {
            res.status(500).send({ msg: "server error" })
        }
    }

})

router.get('/getlistAccount', (req, res) => {
    sqlConnect.query('select * from userprivate', (err, result) => {
        const ArrProfile = result.map(user => user.account)
        res.send({ listAccount: ArrProfile })
    })
})
router.route('/getDirTopicSingle/:name/:topic').get((req, res, next) => {
    const mapDir = fs.readdirSync(path.join(`./dataPrivate/${req.params.name}/${req.params.topic}`))
    res.send(mapDir)
})
router.route('/getIndexSingle/:name/:topic/:nametopic').get((req, res, next) => {
    const readFile = fs.readFileSync(path.join(`./dataPrivate/${req.params.name}/${req.params.nametopic}/${req.params.topic}/data.json`))

    const index = JSON.parse(readFile).length - 1
    res.send(String(index))
})

router.get('/filePrivate', (req, res, next) => {
    const token = req.query.token
    try {
        sqlConnect.query('SELECT * FROM userprivate', (err, result) => {
            const findItem = result.find(item => item.token === token)

            if (findItem) {
                try {
                    router.stack.forEach((middleware, index) => {
                        if (middleware.regexp.test('/shareimg')) {
                            router.stack.splice(index, 1)
                        }
                    });
                    router.use('/shareimg', express.static(path.join(`./dataPrivate/${findItem.account}`)))

                    res.send({ static: true })
                } catch (err) {
                    res.status(401).send('Invalid token');
                }

            } else {
                res.status(401).send('Missing token');
            }
        })
    } catch (error) {
        if (error) {
            throw error
        }
    }
});
router.get('/getSingleTopic/:name', (req, res, next) => {
    const pathData = path.join('./dataPrivate', req.params.name, 'data.json')
    const jsonData = JSON.parse(fs.readFileSync(pathData))

    res.send({ data: jsonData });
});

module.exports = router