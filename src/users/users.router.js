const router = require('express').Router()
const passportJwt = require('../middleware/auth.middleware')
const userServices = require('./users.services')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)

router.get('/:id', userServices.getUserById)
router.get('/:id', userServices.getUserByEmail)
router.patch('/:id', passportJwt, userServices.patchUser)
router.delete('/:id', passportJwt, userServices.deleteUser)

module.exports = router