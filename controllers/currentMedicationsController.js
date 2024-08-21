const userInfoModel = require("../models/userInfoModel");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Add Current Medications
    // @Route  POST /api/v1/medication/:id
    // @Access Private
    addCurrentMedications: handlersFactory.addInModel(userInfoModel, 'currentMedications'),
    // @desc   Update Current Medications
    // @Route  PUT /api/v1/medication/:id
    // @Access Private
    updateCurrentMedications: handlersFactory.updateInModel(userInfoModel, 'currentMedications', 'name dose frequency'),
    // @desc   Delete Current Medications
    // @Route  DELETE /api/v1/medication/:id
    // @Access Private
    deleteCurrentMedications: handlersFactory.deleteInModel(userInfoModel, 'currentMedications')
}