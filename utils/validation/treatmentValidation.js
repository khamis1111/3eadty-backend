const { check } = require("express-validator")
const validationMiddleware = require("../../middleware/validationMiddleware")
const userInfoModel = require("../../models/userInfoModel")

exports.addTreatmentsPlanValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('treatments')
        .notEmpty()
        .withMessage('Treatments is required')
        .isLength({ min: 3 })
        .withMessage('Treatments is too short'),
    validationMiddleware
]

exports.updateTreatmentsPlanValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('treatments')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Treatments is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsPlan.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteTreatmentsPlanValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsPlan.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]


exports.addTreatmentsHistoryValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('historyType')
        .notEmpty()
        .withMessage('history Type is required')
        .isLength({ min: 3 })
        .withMessage('history Type is too short'),
    validationMiddleware
]

exports.updateTreatmentsHistoryValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('historyType')
        .optional()
        .isLength({ min: 3 })
        .withMessage('history Type is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsHistory.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteTreatmentsHistoryValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsHistory.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.addTreatmentsDetailsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('process')
        .notEmpty()
        .withMessage('Process is required')
        .isLength({ min: 3 })
        .withMessage('Process is too short'),
    validationMiddleware
]

exports.updateTreatmentsDetailsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('process')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Process is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsDetails.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteTreatmentsDetailsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Treatments ID is required')
        .isMongoId()
        .withMessage('Invalid Treatments Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const treatmentsId = []
            user.treatmentsDetails.forEach((element) => {
                treatmentsId.push(element._id.toString())
            })

            if (!treatmentsId.includes(id)) {
                throw new Error(`There is no Treatments for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

