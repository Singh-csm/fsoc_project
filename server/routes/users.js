import express from 'express';

import { signin, signup, resetPassword, forgotPassword  } from '../controllers/user.js';

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/password/reset/:token", resetPassword);
router.post("/password/forgot", forgotPassword );

export default router;
