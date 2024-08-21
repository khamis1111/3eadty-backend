const router = require('express').Router()
const { deleteTreatmentsPlan, updateTreatmentsPlan, addTreatmentsPlan, resizeImg, uploadSingleImg, addTreatmentsHistory, updateTreatmentsHistory, deleteTreatmentsHistory, addTreatmentsDetails, updateTreatmentsDetails, deleteTreatmentsDetails } = require('../controllers/treatmentController')
const { addTreatmentsPlanValidation, updateTreatmentsPlanValidation, deleteTreatmentsPlanValidation, addTreatmentsHistoryValidation, updateTreatmentsHistoryValidation, deleteTreatmentsHistoryValidation, addTreatmentsDetailsValidation, updateTreatmentsDetailsValidation, deleteTreatmentsDetailsValidation } = require('../utils/validation/treatmentValidation')

router.route('/plan/:id')
    .post(addTreatmentsPlanValidation, addTreatmentsPlan)
    .put(updateTreatmentsPlanValidation, updateTreatmentsPlan)
    .delete(deleteTreatmentsPlanValidation, deleteTreatmentsPlan)

router.route('/history/:id')
    .post(addTreatmentsHistoryValidation, addTreatmentsHistory)
    .put(updateTreatmentsHistoryValidation, updateTreatmentsHistory)
    .delete(deleteTreatmentsHistoryValidation, deleteTreatmentsHistory)

router.route('/details/:id')
    .post(addTreatmentsDetailsValidation, addTreatmentsDetails)
    .put(updateTreatmentsDetailsValidation, updateTreatmentsDetails)
    .delete(deleteTreatmentsDetailsValidation, deleteTreatmentsDetails)

module.exports = router