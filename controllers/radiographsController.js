const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const userInfoModel = require("../models/userInfoModel");
const { multiImg } = require("../utils/uploadImg");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Upload Multi Img => Add & Update Radio
    // @Route  POST /api/v1/radio/:id
    // @Access Private
    uploadMultiImg: multiImg([{ name: 'scannerImg', maxcount: 10 }]),
    resizeImg: expressAsyncHandler(async (req, file, cb) => {
        if (req.files.scannerImg) {
            req.body.scannerImg = []
            let fileName = ''
            req.files.scannerImg.forEach(async (data, index) => {
                fileName = `scanner-${Date.now()}-${index + 1}.jpeg`
                req.body.scannerImg.push(fileName)
                await sharp(data.buffer)
                    .resize(600, 600)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`uploads/scanner/${fileName}`)
            })
        }
        cb(null, true)
    }),
    // @desc   Add Radio graphs
    // @Route  POST /api/v1/radio/:id
    // @Access Private
    addRadiographs: handlersFactory.addInModel(userInfoModel, 'radiographs'),
    // @desc   Update Radio graphs
    // @Route  PUT /api/v1/radio/:id
    // @Access Private
    updateRadiographs: handlersFactory.updateInModel(userInfoModel, 'radiographs', 'radioType date toothNumber findings scannerImg'),
    // @desc   Delete Radio graphs
    // @Route  DELETE /api/v1/radio/:id
    // @Access Private
    deleteRadiographs: handlersFactory.deleteInModel(userInfoModel, 'radiographs')
}