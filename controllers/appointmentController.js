const slugify = require("slugify");
const appointmentModel = require("../models/appointmentModel");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Add Appointment
    // @Route  POST /api/v1/appointment
    // @Access Private
    addAppointment: handlersFactory.addOne(appointmentModel),
    // @desc   Get All Appointment
    // @Route  GET /api/v1/appointment
    // @Access Private
    getAllAppointment: handlersFactory.getAll(appointmentModel, "appointment"),
    // @desc   Get One Appointment
    // @Route  GET /api/v1/appointment/:id
    // @Access Private
    getOneAppointment: handlersFactory.getOne(appointmentModel),
    // @desc   Update Appointment
    // @Route  PUT /api/v1/appointment/:id
    // @Access Private
    updateAppointment: handlersFactory.updateOne(appointmentModel),
    // @desc   Delete One Appointment
    // @Route  DELETE /api/v1/appointment/:id
    // @Access Private
    deleteAppointment: handlersFactory.deleteOne(appointmentModel),
    // @desc   Delete All Appointment
    // @Route  DELETE /api/v1/appointment
    // @Access Private
    deleteAllAppointment: handlersFactory.deleteAll(appointmentModel),
    // @desc   Set Slugify => Add & Update Appointment
    // @Route  POST /api/v1/appointment, PUT /api/v1/appointment/:id
    // @Access Private
    filterObj: (req, res, next) => {
        if (req.body.patientName) req.body.slug = slugify(req.body.patientName)
        next()
    },
}