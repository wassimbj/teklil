const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokensList = {};
module.exports = {
  read: function (req, res) {
    UserModel.find({}, (err, docs) => {
      if (err) {
        console.log(`Error: ` + err);
        res
          .status(406)
          .json({
            status: 406,
            message: "Not Acceptable Error User Create",
            data: null,
          });
      } else {
        if (docs.length === 0) {
          res
            .status(200)
            .json({ status: 200, message: "Find all user", data: docs });
          console.log("message");
        } else {
          res
            .status(200)
            .json({ status: 200, message: "Find all user", data: docs });
        }
      }
    });
  },
  login: function (req, res, next) {
    //attribut   //valeur
    UserModel.findOne({ email: req.body.email }, function (err, item) {
      if (err) {
        res
          .status(406)
          .json({ status: 406, message: " error login", data: null });
      } else {
        if (item != null) {
          if (bcrypt.compareSync(req.body.password, item.password)) {
            const token = jwt.sign({ user: item._id }, "jobgate", {
              expiresIn: "1h",
            });
            const refresshToken = jwt.sign({ user: item._id }, "itgate", {
              expiresIn: "2h",
            });
            // const refresshToken=randtoken.uid(256)
            tokensList[refresshToken] = {
              status: "logged in",
              token: token,
              refresshToken: refresshToken,
            };
            console.log(tokensList);
            res
              .status(200)
              .json({
                status: 200,
                message: " user found",
                data: item,
                token: token,
                refresshToken: refresshToken,
              });
          } else {
            res
              .status(200)
              .json({
                status: 200,
                message: " error password found",
                data: null,
              });
          }
        } else {
          res
            .status(200)
            .json({ status: 200, message: " email is not found", data: null });
        }
      }
    });
  },

  refreshtoken: function (req, res, next) {
    const id = req.user_data.id;
    if (req.body.refreshToken && req.body.refreshToken in tokensList) {
      const token = jwt.sign({ user: id }, "jobgate", { expiresIn: "1h" });
      const refreshToken = jwt.sign({ user: id }, "itgate", {
        expiresIn: "2h",
      });
      tokensList[refreshToken] = {
        status: "logged in",
        token: token,
        refreshToken: refreshToken,
      };
      res
        .status(200)
        .json({
          status: 200,
          message: " user found",
          data: null,
          token: token,
          refreshToken: refreshToken,
        });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "invalid request ", data: null });
    }
  },

  logout: function (req, res, next) {
    var refreshToken = req.body.refreshToken;
    if (refreshToken in tokensList) {
      delete tokensList[refreshToken];
    }
    res
      .status(200)
      .json({ status: 200, message: "LogOut Account ", data: null });
  },
};
