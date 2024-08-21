const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const userInfoModel = require("../models/userInfoModel");
const { singleImg } = require("../utils/uploadImg");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Upload Single Img => Add & Update Treatments
    // @Route  POST /api/v1/treatments/:id
    // @Access Private
    uploadSingleImg: singleImg('image'),
    resizeImg: expressAsyncHandler(async (req, file, cb) => {
        if (req.file) {
            const fileName = `treatments-${Date.now()}.jpeg`
            req.body.image = fileName
            await sharp(req.file.buffer)
                .resize(600, 600)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`uploads/treatment/${fileName}`)
        }
        cb(null, true)
    }),
    // @desc   Add Treatments Plan
    // @Route  POST /api/v1/treatments/:idPlan
    // @Access Private
    addTreatmentsPlan: handlersFactory.addInModel(userInfoModel, 'treatmentsPlan'),
    // @desc   Update Treatments Plan
    // @Route  PUT /api/v1/treatments/:idPlan
    // @Access Private
    updateTreatmentsPlan: handlersFactory.updateInModel(userInfoModel, 'treatmentsPlan', 'date treatments dentist image'),
    // @desc   Delete Treatments Plan
    // @Route  DELETE /api/v1/treatments/:idPlan
    // @Access Private
    deleteTreatmentsPlan: handlersFactory.deleteInModel(userInfoModel, 'treatmentsPlan'),
    // @desc   Add Treatments History
    // @Route  POST /api/v1/treatments/:idHistory
    // @Access Private
    addTreatmentsHistory: handlersFactory.addInModel(userInfoModel, 'treatmentsHistory'),
    // @desc   Update Treatments History
    // @Route  PUT /api/v1/treatments/:idHistory
    // @Access Private
    updateTreatmentsHistory: handlersFactory.updateInModel(userInfoModel, 'treatmentsHistory', 'historyType date toothNumber material'),
    // @desc   Delete Treatments History
    // @Route  DELETE /api/v1/treatments/:idHistory
    // @Access Private
    deleteTreatmentsHistory: handlersFactory.deleteInModel(userInfoModel, 'treatmentsHistory'),
    // @desc   Add Treatments History
    // @Route  POST /api/v1/treatments/:idHistory
    // @Access Private
    addTreatmentsDetails: handlersFactory.addInModel(userInfoModel, 'treatmentsDetails'),
    // @desc   Update Treatments Details
    // @Route  PUT /api/v1/treatments/:idDetails
    // @Access Private
    updateTreatmentsDetails: handlersFactory.updateInModel(userInfoModel, 'treatmentsDetails', 'process processDetails price date'),
    // @desc   Delete Treatments Details
    // @Route  DELETE /api/v1/treatments/:idDetails
    // @Access Private
    deleteTreatmentsDetails: handlersFactory.deleteInModel(userInfoModel, 'treatmentsDetails'),
}