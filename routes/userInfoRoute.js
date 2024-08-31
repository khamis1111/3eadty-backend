const router = require('express').Router()
const { protectAuth, allowedTo } = require('../controllers/authController')
const { getAllUserInfo, addUserInfo, getOneUserInfo, updateUserInfo, deleteUserInfo, filterObj, userIsPaid, deleteAllUserInfo, userIsNotPaid } = require('../controllers/userInfoController')
const { addUserInfoValidation, getOneUserInfoValidation, updateUserInfoValidation, deleteUserInfoValidation } = require('../utils/validation/userInfoValidation')


router.use(protectAuth(), allowedTo('admin'))

router.route('/')
    .get(getAllUserInfo)
    .post(filterObj, addUserInfoValidation, addUserInfo)
    .delete(deleteAllUserInfo)
router.route('/:id')
    .get(getOneUserInfoValidation, getOneUserInfo)
    .put(filterObj, updateUserInfoValidation, updateUserInfo)
    .delete(deleteUserInfoValidation, deleteUserInfo)

router.post('/paid/:id', userIsPaid)
router.post('/notPaid/:id', userIsNotPaid)

module.exports = router