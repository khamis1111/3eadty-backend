const { check } = require("express-validator")
const validationMiddleware = require("../../middleware/validationMiddleware")
const userInfoModel = require("../../models/userInfoModel")

exports.addClinicalExaminationValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('notes')
        .notEmpty()
        .withMessage('Notes is required')
        .isLength({ min: 3 })
        .withMessage('Notes is too short'),
    validationMiddleware
]

exports.updateClinicalExaminationValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('notes')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Notes is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Clinical Examination ID is required')
        .isMongoId()
        .withMessage('Invalid Clinical Examination Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const examinationId = []
            user.clinicalExamination.forEach((element) => {
                examinationId.push(element._id.toString())
            })

            if (!examinationId.includes(id)) {
                throw new Error(`There is no Clinical Examination for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteClinicalExaminationValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Clinical Examination ID is required')
        .isMongoId()
        .withMessage('Invalid Clinical Examination Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const examinationId = []
            user.clinicalExamination.forEach((element) => {
                examinationId.push(element._id.toString())
            })

            if (!examinationId.includes(id)) {
                throw new Error(`There is no Clinical Examination for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]
