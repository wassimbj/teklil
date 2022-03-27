import Redis from 'ioredis';
import constants from '../constants';

const redis = constants.IS_PROD
? new Redis(constants.REDIS_URL)
: new Redis({host: 'redis'});

export default redis;
