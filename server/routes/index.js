/**
 * ? API Routes
 */
import OAuthUser from "./auth/OAuthUser";
import Posts from "./Posts";

module.exports = (app) => {
  // ----------------------------------------
  app.use(OAuthUser);
  app.use(Posts);
  // ----------------------------------------
};
