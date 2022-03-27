import db from "../../../database/init";
// import { validationResult } from 'express-validator';
// const edge = require("edge.js");
// const send_mail = require("../../helpers/sendMail");
import logger from "../../../utils/logger";

class User {
  async me(req, res) {
    let { rows } = await db.query(
      "SELECT id, points, fullname FROM users WHERE id = $1",
      [req.session.userid]
    );
    let data = {};
    if (rows.length > 0) {
      data.points = rows[0].points;
      data.fullname = rows[0].fullname;
      data.id = rows[0].id;
    }

    return res.status(200).json(data);
  }

  // Log out the user
  async logout(req, res) {
    req.session.destroy((err) => {
      if (!err) {
        return res.status(200).json("logged out");
      } else {
        logger.error(`LOGOUT ERROR: ${err}`);
        return res.status(400).json("Something went wrong, Cant logout");
      }
    });
  }

  // Authentication middlewares
  // --> see if user is not authenticated else redirect him to login
  async auth(req, res, next) {
    try {
      if (!req.session.userid) {
        return res.status(401).json("unauthorized");
      }

      // else
      next();
    } catch (err) {
      logger.error(`MUST AUTH ERROR: ${err}`);
      return res.status(500).json("something went wrong");
    }
  }

  // --> see if user is authenticated
  // ken user is authenticated, w yemchi lel login w ila lel register mat5alichi
  redirectIfAuth(req, res, next) {
    if (req.session.userid) return res.status(401);
    // else
    next();
  }
}

export default new User();
