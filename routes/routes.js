const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')
const controller = require('../controllers/controller')

router.get('/list', controller.getUsers)
router.post('/register', controller.register)
router.post('/login', controller.login)
router.delete('/delete/:id', controller.delete)

module.exports = router