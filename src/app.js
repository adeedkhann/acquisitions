import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';


const app = express();


app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined' , {stream :{ write: (msg)=>logger.info(msg.trim())}}));
app.get('/', (req, res) => {
  logger.info('Hello from acquisitions');
  res.status(200).send('hello from api');
});

app.get('/health' , (req , res)=>{
  res.status(200).json({
    status:'OK',
    timestamp : new Date().toISOString() , uptime: process.uptime()
  });
});

app.get('/api', (req , res)=>{
  res.status(200).json({
    message : 'acquisitoin api is running'
  });
});

app.use('/api/auth' , authRouter);

export default app;
