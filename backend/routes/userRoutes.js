const express = require('express')
const { registerUser, authUser, updateUserProfile, allUsers, getUsers, deleteUser } = require('../controllers/userControllers')
const router = express.Router()
const { protect, isAdmin } = require("../middlewares/authMiddleware")
const User = require('../models/userModel')


router.route('/').post(registerUser, getUsers)
router.route('/login').post(authUser)
router.route('/profile').post(protect, updateUserProfile)
router.route('/user').get(allUsers)
router.delete('/:id', protect, isAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router
