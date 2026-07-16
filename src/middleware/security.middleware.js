import aj from '#config/arcjet.js';
import { slidingWindow } from '@arcjet/node';
import logger from '../config/logger.js';

export const securityMiddleware = async(req , res ,next)=>{
  try {
    const role = req.user?.role || 'guest';
    let limit;
    let message;

    switch (role){
      case 'admin':
        limit = 20;
        message = 'admin req limit exceeded 20 per minute slow down';
        break;
      case 'user':
        limit=10;
        message='user req lim exceeded 10pm';
        break;
      case 'guest':
        limit=5;
        message='guest req lim exceed 5pm';
        break;
    }

    const client = aj.withRule(slidingWindow({mode:'LIVE' , interval:'1m' ,max:limit , name:`${role}-rate-limit`}));
    const decision = await client.protect(req);
    if(decision.isDenied() && decision.reason.isBot()){
      logger.warn('Bot req blocked' , {ip:req.ip  , userAgent: req.get('User-Agent') , path:req.path});
      return res.status(403).json({error:'forbidden' ,message:'autamated req is not allowed'});
    }
    if(decision.isDenied() && decision.reason.isShield()){
      logger.warn('shield req blocked' , {ip:req.ip  , userAgent: req.get('User-Agent') , path:req.path , method:req.method});
      return res.status(403).json({error:'forbidden' ,message:'request block bt return policy'});
    }
    if(decision.isDenied() && decision.reason.isRateLimit()){
      logger.warn('rate lim exceeded' , {ip:req.ip  , userAgent: req.get('User-Agent') , path:req.path});
      return res.status(403).json({error:'forbidden' ,message:'too many request'});
    }

    next();

  } catch (error) {
    console.log(error , 'archet middleware error');
    res.status(500).json({error : 'intermal server error' , message:'somehting went wrong int he security middleware'});
  }
};