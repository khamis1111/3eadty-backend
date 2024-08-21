const router = require('express').Router()
const { deleteCurrentMedications, updateCurrentMedications, addCurrentMedications } = require('../controllers/currentMedicationsController')
const { addCurrentMedicationsValidation, updateCurrentMedicationsValidation, deleteCurrentMedicationsValidation } = require('../utils/validation/currentMedicationsValidation')

router.route('/:id')
    .post(addCurrentMedicationsValidation, addCurrentMedications)
    .put(updateCurrentMedicationsValidation, updateCurrentMedications)
    .delete(deleteCurrentMedicationsValidation, deleteCurrentMedications)

module.exports = router