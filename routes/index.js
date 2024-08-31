const userInfoRoute = require('./userInfoRoute')
const treatmentRoute = require('./treatmentRoute')
const currentMedicationsRoute = require('./currentMedicationsRoute')
const radiographsRoute = require('./radiographsRoute')
const clinicalExaminationRoute = require('./clinicalExaminationRoute')
const appointmentRoute = require('./appointmentRoute')
const authRoutes = require('./authRoutes')

const routesMount = (app) => {
    app.use('/api/v1/userInfo', userInfoRoute)
    app.use('/api/v1/treatments', treatmentRoute)
    app.use('/api/v1/medication', currentMedicationsRoute)
    app.use('/api/v1/radio', radiographsRoute)
    app.use('/api/v1/examination', clinicalExaminationRoute)
    app.use('/api/v1/appointment', appointmentRoute)
    app.use('/api/v1/auth', authRoutes)
}
module.exports = routesMount