const loginRouter = require('express').Router()
const loginController = require('../controller/loginController')

loginRouter.get('/login', loginController)


module.exports = loginRouter