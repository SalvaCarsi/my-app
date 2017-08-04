import winston from 'winston';
import { LOG_FILE } from '../config.js';

winston.add(winston.transports.File, { filename: `${LOG_FILE}` });
winston.remove(winston.transports.Console);

const logInfo = (msg) => {
    winston.info(`error: ${msg}`);
}

export default logInfo;
