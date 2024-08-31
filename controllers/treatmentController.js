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
    updateTreatmentsDetails: handlersFactory.updateInModel(userInfoModel, 'treatmentsDetails', 'process processDetails price paid restOfPrice date'),
    // @desc   Delete Treatments Details
    // @Route  DELETE /api/v1/treatments/:idDetails
    // @Access Private
    deleteTreatmentsDetails: handlersFactory.deleteInModel(userInfoModel, 'treatmentsDetails'),

    filterObj: async (req, res, next) => {
        const document = await userInfoModel.findById(req.params.id)
        const detailsItem = document.treatmentsDetails.filter((data) => data._id.toString() === req.body.docId)

        if (req.body.price) {
            // Calculate the sum
            const sumPrice = document.price + Number(req.body.price);
            document.price = sumPrice;

            if (detailsItem.length > 0) {
                const subPrice = document.price - detailsItem[0].price;
                const subPaid = document.paid - detailsItem[0].paid;
                document.price = subPrice;
                document.paid = subPaid;
            }

            if (req.body.paid) {
                const sumPaid = document.paid + Number(req.body.paid);
                document.paid = sumPaid;
                req.body.restOfPrice = req.body.price - req.body.paid
                document.restOfPrice = document.price - document.paid
            }

            // Save the document
            await document.save();
        }
        if (req.body.restOfPrice === 0) {
            req.body.isPaid = true
            req.body.paidAt = Date.now()
        }
        next()
    },
    filterObjDelete: async (req, res, next) => {
        const document = await userInfoModel.findById(req.params.id)
        const detailsItem = document.treatmentsDetails.filter((data) => data._id.toString() === req.body.docId)

        if (req.body.docId) {
            // Calculate the sub
            const subPrice = document.price - detailsItem[0].price;
            const subPaid = document.paid - detailsItem[0].paid;
            document.price = subPrice;
            document.paid = subPaid;
            document.restOfPrice = document.price - document.paid
            // Save the document
            await document.save();
        }
        next()
    },
}