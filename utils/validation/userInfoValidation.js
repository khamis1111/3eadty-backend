const { check } = require("express-validator")
const validationMiddleware = require("../../middleware/validationMiddleware")

exports.addUserInfoValidation = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3 })
        .withMessage('Name is too short'),
    check('age')
        .notEmpty()
        .withMessage('Age is required')
        .isNumeric()
        .withMessage('Age must be a number'),
    check('phone')
        .optional()
        .isMobilePhone(['ar-EG'])
        .withMessage('Phone must be Egypt number +20')
        .isNumeric()
        .withMessage('Phone must be a number'),
    check('price')
        .notEmpty()
        .withMessage('price is required')
        .isNumeric()
        .withMessage('price must be a number'),
    check('paid')
        .optional()
        .isNumeric()
        .withMessage('Paid must be a number')
        .custom((val, { req }) => {
            if (val > req.body.price) {
                throw new Error(`Paid must be Lower than Price`)
            }
            return true
        }),
    check('restOfPrice')
        .optional()
        .isNumeric()
        .withMessage('Rest Of Price must be a number'),
    validationMiddleware
]

exports.getOneUserInfoValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    validationMiddleware
]

exports.updateUserInfoValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    check('paid')
        .optional()
        .isNumeric()
        .withMessage('Paid must be a number')
        .custom((val, { req }) => {
            if (val > req.body.price) {
                throw new Error(`Price must be bigger than paid`)
            }
            return true
        }),
    validationMiddleware
]

exports.deleteUserInfoValidation = [
    check('id')
        .isMongoId()
        .withMessage('Invalid User Id'),
    validationMiddleware
]
