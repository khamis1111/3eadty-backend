const router = require('express').Router()
const { addRadiographs, updateRadiographs, deleteRadiographs, uploadMultiImg, resizeImg } = require('../controllers/radiographsController')
const { addRadiographsValidation, updateRadiographsValidation, deleteRadiographsValidation } = require('../utils/validation/radiographsValidation')

router.route('/:id')
    .post(addRadiographsValidation, addRadiographs)
    .put(updateRadiographsValidation, updateRadiographs)
    .delete(deleteRadiographsValidation, deleteRadiographs)

module.exports = router