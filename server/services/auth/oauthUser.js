import db from "../../database/init";
import logger from "../../utils/logger";

async function oauthUser(fullname, email, photo) {
  try {
    const existedUser = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existedUser.rowCount > 0) {
      // login
      return { new_user: false, user_id: existedUser.rows[0].id };
    } else {
      // Create an account
      const newUser = await db.query(
        `INSERT INTO 
          users(
            fullname,
            email, 
            image
          ) 
          VALUES($1,$2,$3)
          RETURNING id`,
        [fullname, email, photo]
      );
      // console.log('newUser: ', newUser);
      return { new_user: true, user_id: newUser.rows[0].id };
    }
  } catch (err) {
    logger.error(`OAUTH USER ERROR: ${err}`);
  }
}

export default oauthUser;
