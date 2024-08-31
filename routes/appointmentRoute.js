const router = require('express').Router()
const { getAllAppointment, addAppointment, getOneAppointment, updateAppointment, deleteAppointment, filterObj, deleteAllAppointment } = require('../controllers/appointmentController')
const { protectAuth, allowedTo } = require('../controllers/authController')
const { addAppointmentValidation, getOneAppointmentValidation, updateAppointmentValidation, deleteAppointmentValidation } = require('../utils/validation/appointmentValidation')

router.use(protectAuth(), allowedTo('admin'))

router.route('/')
    .get(getAllAppointment)
    .post(filterObj, addAppointmentValidation, addAppointment)
    .delete(deleteAllAppointment)
router.route('/:id')
    .get(getOneAppointmentValidation, getOneAppointment)
    .put(filterObj, updateAppointmentValidation, updateAppointment)
    .delete(deleteAppointmentValidation, deleteAppointment)

module.exports = router