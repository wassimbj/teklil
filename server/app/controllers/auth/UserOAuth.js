import logger from "../../../utils/logger";
import oauthUser from "../../../services/auth/oauthUser";

class UserOauth {
  // facebook login, check if there is a user, else create one
  async facebookLoginCallback(req, accessToken, refreshToken, profile, done) {
    try {
      // console.log('Facebook: ', profile);
      let user_res = await oauthUser(
        profile.displayName,
        profile.emails[0].value,
        profile.photos[0].value
      );
      if (user_res.new_user) {
        req.session.userid = user_res.user_id;
        done(null, { new_user: true });
      } else {
        req.session.userid = user_res.user_id;
        done(null, { new_user: false });
      }
    } catch (err) {
      // logger.error(`FACEBOOK_AUTH_ERROR: ${err}`)
      console.log(`FACEBOOK_AUTH_ERROR: ${err}`);
      done(false, null);
    }
  }

  // google login, check if there is a user, else create one
  async googleLoginCallback(req, accessToken, refreshToken, profile, done) {
    try {
      // console.log('Google: ', profile);
      let user_res = await oauthUser(
        profile.displayName,
        profile.emails[0].value,
        profile.photos[0].value
      );
      if (user_res.new_user) {
        req.session.userid = user_res.user_id;
        done(null, { new_user: true });
      } else {
        req.session.userid = user_res.user_id;
        done(null, { new_user: false });
      }
    } catch (err) {
      logger.error(`GOOGLE_AUTH_ERROR: ${err}`);
      done(false, null);
    }
  }
}

export default new UserOauth();
