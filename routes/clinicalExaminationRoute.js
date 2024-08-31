const router = require('express').Router()
const { protectAuth, allowedTo } = require('../controllers/authController')
const { deleteClinicalExamination, updateClinicalExamination, addClinicalExamination } = require('../controllers/clinicalExaminationController')
const { addClinicalExaminationValidation, updateClinicalExaminationValidation, deleteClinicalExaminationValidation } = require('../utils/validation/clinicalExaminationValidation')

router.use(protectAuth(), allowedTo('admin'))

router.route('/:id')
    .post(addClinicalExaminationValidation, addClinicalExamination)
    .put(updateClinicalExaminationValidation, updateClinicalExamination)
    .delete(deleteClinicalExaminationValidation, deleteClinicalExamination)

module.exports = router