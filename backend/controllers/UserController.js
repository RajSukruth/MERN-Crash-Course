import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc User Authentication
// route POST /api/users/auth
// access Public
const authUser = asyncHandler(async (req,res)=>{
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if(user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : email
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
})

// @desc User Register
// route POST /api/users
// access Public
const registerUser = asyncHandler(async (req,res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id : user._id,
            name : name,
            email : email
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// @desc User Logout
// route POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'Logout User'})
})

// @desc Get User Profile
// route GET /api/users/profile
// access Private
const getUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'User Profile'})
})

// @desc Update User Profile
// route PUT /api/users/profile
// access Private
const updateUserProfile = asyncHandler(async (req,res)=>{
    res.status(200).json({message: 'User Profile Updated'})
})


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};
