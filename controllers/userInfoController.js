const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const userInfoModel = require("../models/userInfoModel");
const ApiError = require("../utils/apiError");
const handlersFactory = require("./factory/handlersFactory");

module.exports = {
    // @desc   Add User Info
    // @Route  POST /api/v1/userInfo
    // @Access Private
    addUserInfo: handlersFactory.addOne(userInfoModel),
    // @desc   Get All User Info
    // @Route  GET /api/v1/userInfo
    // @Access Private
    getAllUserInfo: handlersFactory.getAll(userInfoModel),
    // @desc   Get One User Info
    // @Route  GET /api/v1/userInfo/:id
    // @Access Private
    getOneUserInfo: handlersFactory.getOne(userInfoModel),
    // @desc   Update User Info
    // @Route  PUT /api/v1/userInfo/:id
    // @Access Private
    updateUserInfo: handlersFactory.updateOne(userInfoModel),
    // @desc   Delete One User Info
    // @Route  DELETE /api/v1/userInfo/:id
    // @Access Private
    deleteUserInfo: handlersFactory.deleteOne(userInfoModel),
    // @desc   Delete All User Info
    // @Route  DELETE /api/v1/userInfo
    // @Access Private
    deleteAllUserInfo: handlersFactory.deleteAll(userInfoModel),
    // @desc   Update Is Paid User Info
    // @Route  PUT /api/v1/userInfo/:id
    // @Access Private
    userIsPaid: expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params
        const user = await userInfoModel.findById(id)

        if (!user) {
            return next(new ApiError(`There is no user for this id ${id}`))
        }
        user.isPaid = true
        user.paidAt = Date.now()
        await user.save()
        res.status(200).json({ status: 'Success', data: user })
    }),
    // @desc   Update Is Paid User Info
    // @Route  PUT /api/v1/userInfo/notPaid/:id
    // @Access Private
    userIsNotPaid: expressAsyncHandler(async (req, res, next) => {
        const { id } = req.params
        const user = await userInfoModel.findById(id)

        if (!user) {
            return next(new ApiError(`There is no user for this id ${id}`))
        }
        user.isPaid = false
        user.paidAt = undefined
        await user.save()
        res.status(200).json({ status: 'Success', data: user })
    }),
    // @desc   Set Slugify & Calc RestOfPrice => Add & Update User
    // @Route  POST /api/v1/userInfo, PUT /api/v1/userInfo/:id
    // @Access Private
    filterObj: (req, res, next) => {
        if (req.body.name) req.body.slug = slugify(req.body.name)
        if (req.body.paid) req.body.restOfPrice = req.body.price - req.body.paid
        if (req.body.restOfPrice === 0) {
            req.body.isPaid = true
            req.body.paidAt = Date.now()
        }
        next()
    },
}