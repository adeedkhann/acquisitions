import express from 'express';

const router = express.Router();

router.post('signup' , (req ,res)=>{
  res.send('POST /api/auth/signup response');
});

router.post('singin' , (req ,res)=>{
  res.send('POST /api/auth/singin response');
});

router.post('signout' , (req ,res)=>{
  res.send('POST /api/auth/signout response');
});

export default router;