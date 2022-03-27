"use strict";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import path from "path";
import constants from "../constants";

// Log files
const errorLogsFile = path.join(__dirname, "../", "logs/errors.log"); // error levels
const infoLogsFile = path.join(__dirname, "../", "logs/info.log"); // info levels
const exceptionsLogsFile = path.join(__dirname, "../", "logs/exceptions.log");

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.prettyPrint()
  ),

  transports: [
    new transports.DailyRotateFile({
      filename: `${errorLogsFile}`,
      level: "error",
      maxsize: "20mb",
      maxFiles: "1d",
    }),
    new transports.DailyRotateFile({
      filename: `${infoLogsFile}`,
      level: "info",
      maxsize: "5mb",
      maxFiles: "1d",
    }),
  ],
});

// Call exceptions.handle with a transport to handle exceptions
if(constants.IS_PROD){
  logger.exceptions.handle(
    new transports.DailyRotateFile({
      filename: `${exceptionsLogsFile}`,
      maxsize: "20mb",
      maxFiles: "0d",
      silent: false,
    })
  );
}

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
// if (process.env.NODE_ENV !== 'production') {
logger.add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  })
);
// }

export default logger;
