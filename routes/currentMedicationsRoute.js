const router = require('express').Router()
const { protectAuth, allowedTo } = require('../controllers/authController')
const { deleteCurrentMedications, updateCurrentMedications, addCurrentMedications } = require('../controllers/currentMedicationsController')
const { addCurrentMedicationsValidation, updateCurrentMedicationsValidation, deleteCurrentMedicationsValidation } = require('../utils/validation/currentMedicationsValidation')

router.use(protectAuth(), allowedTo('admin'))

router.route('/:id')
    .post(addCurrentMedicationsValidation, addCurrentMedications)
    .put(updateCurrentMedicationsValidation, updateCurrentMedications)
    .delete(deleteCurrentMedicationsValidation, deleteCurrentMedications)

module.exports = router