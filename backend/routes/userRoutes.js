const express = require('express')
const { registerUser, authUser, updateUserProfile, allUsers, getUsers } = require('../controllers/userControllers')
const router = express.Router()
const { protect } = require("../middlewares/authMiddleware")

router.route('/').post(registerUser, getUsers)
router.route('/login').post(authUser)
router.route('/profile').post(protect, updateUserProfile)
router.route('/user').get(allUsers)

module.exports = router
