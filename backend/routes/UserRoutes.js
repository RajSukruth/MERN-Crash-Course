import express from 'express';
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile } from '../controllers/UserController.js';

router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.post('/register', registerUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);


export default router;