import 'dotenv/config';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query' , 'info' , 'warn' , 'error'] : ['error'],
});


export const connctDB = async()=>{
  try {
    await prisma.$connect();
    console.log('neon db connect success');
  } catch (error) {
    console.log('db connect failed ' , error.message);
    process.exit(1);
  }
};


export default prisma;