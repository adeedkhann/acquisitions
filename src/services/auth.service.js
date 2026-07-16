import bcrypt from 'bcrypt';
import {prisma} from '../lib/prisma.js';
import logger from '../config/logger.js';
export const hashPassword = async(password)=>{
  try {
    return await bcrypt.hash(password , 10);
  } catch (error) {
    logger.error(`Error hashing the password: ${error}`);
    throw new Error('error hashing', { cause: error });
  }
};

export const createUser = async({name , email , password , role='user'})=>{
  try {
    const existingUser = await prisma.user.findUnique({
      where:{email}
    });

    if(existingUser){
      throw new Error('User already exist');

    }

    const passwordhash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordhash,
        role
      }
    });
    logger.info(`user created with email ${email}`);
    return user;
  } catch (error) {
    logger.error(`error createing user : ${error}`);
    throw error;
  }
};