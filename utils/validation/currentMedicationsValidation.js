const { check } = require("express-validator")
const validationMiddleware = require("../../middleware/validationMiddleware")
const userInfoModel = require("../../models/userInfoModel")

exports.addCurrentMedicationsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name is too short'),
    validationMiddleware
]

exports.updateCurrentMedicationsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Name is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Current Medications ID is required')
        .isMongoId()
        .withMessage('Invalid Current Medications Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const medicationsId = []
            user.currentMedications.forEach((element) => {
                medicationsId.push(element._id.toString())
            })

            if (!medicationsId.includes(id)) {
                throw new Error(`There is no Current Medications for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteCurrentMedicationsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Current Medications ID is required')
        .isMongoId()
        .withMessage('Invalid Current Medications Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const medicationsId = []
            user.currentMedications.forEach((element) => {
                medicationsId.push(element._id.toString())
            })

            if (!medicationsId.includes(id)) {
                throw new Error(`There is no Current Medications for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]
