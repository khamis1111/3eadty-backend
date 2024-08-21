const userInfoModel = require("../models/userInfoModel");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Add Clinical Examination
    // @Route  POST /api/v1/examination/:id
    // @Access Private
    addClinicalExamination: handlersFactory.addInModel(userInfoModel, 'clinicalExamination'),
    // @desc   Update Clinical Examination
    // @Route  PUT /api/v1/examination/:id
    // @Access Private
    updateClinicalExamination: handlersFactory.updateInModel(userInfoModel, 'clinicalExamination', 'notes oralHygiene periodontalStatus'),
    // @desc   Delete Clinical Examination
    // @Route  DELETE /api/v1/examination/:id
    // @Access Private
    deleteClinicalExamination: handlersFactory.deleteInModel(userInfoModel, 'clinicalExamination')
}