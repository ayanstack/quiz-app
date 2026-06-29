import express from 'express';
import multer from 'multer';
import { registerUser, getMe, refreshTokenController, loginUser, logoutUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer();


router.post('/register', upload.none(), registerUser);
router.post('/login', upload.none(), loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
// router.get('/test', 
//     console.log('api running')
// )
router.post('/refresh-token', refreshTokenController);

export default router;









// const express = require('express');
// const multer = require('multer');
// const router = express.Router();
// const registerUser = require('../controllers/authController.js')
// import { logoutUser} from "../controllers/authController.js"


// const upload = multer();

// const { registerUser, authUser } = require('../controllers/authController');

// // ✅ Dono routes me form-data support
// router.post('/register', upload.none(), registerUser);
// router.post('/login', upload.none(), authUser);
// router.post('/logout', logoutUser)

// module.exports = router;















// const express = require('express');
// const { registerUser, authUser } = require('../controllers/authController');



// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', authUser);

// module.exports = router;
