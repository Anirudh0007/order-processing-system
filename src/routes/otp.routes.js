import express from 'express';
import { generateOTP } from '../controllers/otp.controller.js';

const router= express.Router();

router.post('/', generateOTP);

export default router;

