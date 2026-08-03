import express from 'express';
import { registerController, loginController } from '../controllers/auth.controller.js';

console.log("auth routes loaded")

const router=express.Router();

router.get("/test", (req, res) => {
    res.send("Auth Route Works");
});



router.post('/register', registerController);
router.post('/login', loginController);

export default router;