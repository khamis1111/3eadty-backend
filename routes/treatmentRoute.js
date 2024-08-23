const router = require('express').Router()
const { deleteTreatmentsPlan, updateTreatmentsPlan, addTreatmentsPlan, resizeImg, uploadSingleImg, addTreatmentsHistory, updateTreatmentsHistory, deleteTreatmentsHistory, addTreatmentsDetails, updateTreatmentsDetails, deleteTreatmentsDetails, filterObj, filterObjDelete } = require('../controllers/treatmentController')
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
    .post(filterObj, addTreatmentsDetailsValidation, addTreatmentsDetails)
    .put(filterObj, updateTreatmentsDetailsValidation, updateTreatmentsDetails)
    .delete(filterObjDelete, deleteTreatmentsDetailsValidation, deleteTreatmentsDetails)

module.exports = router