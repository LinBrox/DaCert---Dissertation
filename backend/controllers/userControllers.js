const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic, walletID } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
    walletID,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      walletID: user.walletID,
      token: generateToken(user._id),
    });
  } else{
    res.status(400)
    throw new Error("Error Occured! ");
  }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            walletID: user.walletID,
            token: generateToken(user._id),
        });
    } else{
        res.status(400)
        throw new Error("Invalid Email or Password! ");
      }

  });

  const allUsers = asyncHandler(async (req, res) => {
    const user = await user.find(req.params.id)
  
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  
    res.json(user)
  })

  const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      user.walletID = req.body.walletID || user.walletID;

      if(req.body.password){
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        walletID: updatedUser.walletID,
        token: generateToken(updatedUser._id),
      })
    }
    else {
      res.status(404)
      throw new Error("User Not Found");
    }
  })

module.exports = { registerUser, authUser, updateUserProfile, allUsers}
