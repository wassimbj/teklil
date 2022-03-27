require("dotenv").config();
import app from "../app";
import constants from "../constants";
import logger from "../utils/logger.js";

app.listen(constants.PORT, () => {
  logger.info(
    `Server is running on port ${constants.PORT}, In ${constants.NODE_ENV} Mode`
  );
});
