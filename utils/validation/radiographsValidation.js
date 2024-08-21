const { check } = require("express-validator")
const validationMiddleware = require("../../middleware/validationMiddleware")
const userInfoModel = require("../../models/userInfoModel")

exports.addRadiographsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('radioType')
        .notEmpty()
        .withMessage('Radio Type is required')
        .isLength({ min: 3 })
        .withMessage('Radio Type is too short'),
    validationMiddleware
]

exports.updateRadiographsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('radioType')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Radio Type is too short'),
    check('docId')
        .notEmpty()
        .withMessage('Radio Graphs ID is required')
        .isMongoId()
        .withMessage('Invalid Radio Graphs Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const radiographsId = []
            user.radiographs.forEach((element) => {
                radiographsId.push(element._id.toString())
            })

            if (!radiographsId.includes(id)) {
                throw new Error(`There is no Radio Graphs for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteRadiographsValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('docId')
        .notEmpty()
        .withMessage('Radio Graphs ID is required')
        .isMongoId()
        .withMessage('Invalid Radio Graphs Id')
        .custom(async (id, { req }) => {
            const user = await userInfoModel.findById(req.params.id)
            if (!user) {
                throw new Error(`There is no User for this Id ${id}`)
            }
            const radiographsId = []
            user.radiographs.forEach((element) => {
                radiographsId.push(element._id.toString())
            })

            if (!radiographsId.includes(id)) {
                throw new Error(`There is no Radio Graphs for this Id ${id}`)
            }
            return true
        }),
    validationMiddleware
]
