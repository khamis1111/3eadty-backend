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
        .optional()
        .isNumeric()
        .withMessage('price must be a number')
        .custom((val, { req }) => {
            if (Number(val) < Number(req.body.paid)) {
                throw new Error(`Price must be bigger than paid`)
            }
            return true
        }),
    check('paid')
        .optional()
        .isNumeric()
        .withMessage('Paid must be a number'),
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
    check('price')
        .optional()
        .isNumeric()
        .withMessage('price must be a number')
        .custom((val, { req }) => {
            if (Number(val) < Number(req.body.paid)) {
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
