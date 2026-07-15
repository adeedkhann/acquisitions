import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup' , signup);

router.post('singin' , (req ,res)=>{
  res.send('POST /api/auth/singin response');
});

router.post('signout' , (req ,res)=>{
  res.send('POST /api/auth/signout response');
});

export default router;