const signupRouter = require('express').Router()
const signupController = require('../controller/signupController')

signupRouter.get('/signup', signupController)


module.exports = signupRouter