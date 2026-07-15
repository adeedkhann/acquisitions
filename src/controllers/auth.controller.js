import logger from '../config/logger.js';
import {signupSchema} from '../validations/auth.validation.js';
import {formatValidations} from '../utils/format.js';
import { createUser } from '../services/auth.service.js';
import {jwttoken} from '../utils/jwt.js';
import { cookies } from '../utils/cookies.js';
export const signup = async(req , res , next)=>{
  try {
    const valiationResult = signupSchema.safeParse(req.body);
    if(!valiationResult.success){
      return res.status(400).json({
        error:'validation error',
        details:formatValidations(valiationResult.error)
      });
    }
        
    const {email , name , password , role} = valiationResult.data;
    // auth serice

    const user = await createUser({name  , email , password , role});
    const token = jwttoken.sign({id:user.id , email :user.email , role :user.role});
    cookies.set(res , 'token' , token);
    logger.info(`User registered successfully: ${email} `);
    res.status(201).json({
      message:'User registered',
      user
    });

  } catch (error) {
    logger.error('signup error' , error);
    if(error.message === 'User with this email already exists'){
      return res.status(409).json({error:'Email alreay exists'});

    }

    next(error);
  }
};