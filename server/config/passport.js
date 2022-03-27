import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth2';
import UserOauthController from '../app/controllers/auth/UserOAuth';
import constants from '../constants';

// Facebook login
passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: constants.FACEBOOK_APP_ID,
      clientSecret: constants.FACEBOOK_APP_SECRET,
      callbackURL:  constants.IS_PROD ? `${constants.API_URL}/auth/facebook/callback` : `${constants.API_URL}/auth/facebook/callback`,
      profileFields: ['id', 'displayName', 'photos', 'email'],
      passReqToCallback: true,
    },
    UserOauthController.facebookLoginCallback
  )
);

// Google login
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: constants.GOOGLE_CLIENT_ID,
      clientSecret: constants.GOOGLE_CLIENT_SECRET,
      callbackURL:  constants.IS_PROD ? `${constants.API_URL}/auth/google/callback` : `${constants.API_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    UserOauthController.googleLoginCallback
  )
);
