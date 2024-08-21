const router = require('express').Router()
const { deleteClinicalExamination, updateClinicalExamination, addClinicalExamination } = require('../controllers/clinicalExaminationController')
const { addClinicalExaminationValidation, updateClinicalExaminationValidation, deleteClinicalExaminationValidation } = require('../utils/validation/clinicalExaminationValidation')

router.route('/:id')
    .post(addClinicalExaminationValidation, addClinicalExamination)
    .put(updateClinicalExaminationValidation, updateClinicalExamination)
    .delete(deleteClinicalExaminationValidation, deleteClinicalExamination)

module.exports = router