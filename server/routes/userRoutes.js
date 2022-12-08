import express from "express";
const router = express.Router()
import {authUser, getUsers, logoutUser ,getUserProfile, registerUser, updateUserProfile} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin,getUsers)
router.post('/login', authUser)
router.route('/profile')
.get(protect, getUserProfile,)
.put(protect, updateUserProfile)
router.route('/logout').get(protect, logoutUser)

export default router