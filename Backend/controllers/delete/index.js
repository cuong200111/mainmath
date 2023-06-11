const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
require('dotenv').config()
const API_IMG = process.env.API_IMG

function deleteFolderRecursive(path, active) {
    if (!active) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = path + '/' + file
                if (fs.lstatSync(curPath).isDirectory()) {
                    deleteFolderRecursive(curPath)
                } else {
                    fs.unlinkSync(curPath)
                }
            })
            fs.rmdirSync(path)
        }
    } else {
        fs.unlinkSync(path)
    }
}
router.delete('/deleteContentTopic', (req, res, next) => {
    const { fomula, mark, question, id, IB, nameTopic, dirName } = req.query
    const data = JSON.parse(fs.readFileSync(path.join(`./data/Contains/${IB}/${dirName}/${nameTopic}/data.json`)))
    const sliceFomula = path.join(`./data/Contains/${fomula.slice(fomula.indexOf('/imgdata/') + 9)}`)
    const sliceQuestion = path.join(`./data/Contains/${question.slice(question.indexOf('/imgdata/') + 9)}`)
    const sliceMark = path.join(`./data/Contains/${mark.slice(mark.indexOf('/imgdata/') + 9)}`)
    //Xoa
    deleteFolderRecursive(sliceFomula, false)
    deleteFolderRecursive(sliceQuestion, true)
    deleteFolderRecursive(sliceMark, false)

    const filterData = data.filter((item, index) => {
        return data.findIndex(itemz => item.id === itemz.id) === index
    }).filter(item => Number(item.id) !== Number(id))


    //data.json
    const imgDir = fs.readdirSync(path.join(`./data/Contains/${IB}/${dirName}/${nameTopic}/img`))
    const pathRename = path.join(`./data/Contains/${IB}/${dirName}/${nameTopic}/img`)

    const filter1 = imgDir.filter((item, index) => {

        if (item.includes('formula')) {
            return item
        }

    })
    filter1.forEach((item, index) => {

        fs.renameSync(path.join(pathRename, item), path.join(pathRename, `formula${index}`))


    })
    const filter2 = imgDir.filter((item, index) => {
        if (item.includes('mark')) {
            return item
        }

    })
    filter2.forEach((item, index) => {
        fs.renameSync(path.join(pathRename, item), path.join(pathRename, `mark${index}`))
    })
    const filter3 = imgDir.filter((item, index) => {
        let i = 0
        if (item.includes('question')) {
            return item
        }

    })
    filter3.forEach((item, index) => {
        fs.renameSync(path.join(pathRename, item), path.join(pathRename, `question${index}.png`))
    })


    const mapData = filterData.map((item, index) => {
        return ({
            "id": index,
            "question": API_IMG + '/' + IB + '/' + dirName + '/' + nameTopic + '/' + 'img' + '/' + 'question' + index + '.png',
            "mark": API_IMG + '/' + IB + '/' + dirName + '/' + nameTopic + '/' + 'img' + '/' + 'formula' + index,
            "formula": API_IMG + '/' + IB + '/' + dirName + '/' + nameTopic + '/' + 'img' + '/' + 'mark' + index,
            "type": item.type
        })
    })
    fs.writeFileSync(path.join(`./data/Contains/${IB}/${dirName}/${nameTopic}/data.json`), JSON.stringify(mapData))
    res.send('xoa thanh cong')
})



module.exports = router