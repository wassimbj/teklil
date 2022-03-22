const SubCategory = require("../models/SubCategory");

module.exports = {
  create: function (req, res) {
    const user = new SubCategory(req.body);
    user.save(function (err, item) {
      if (err) {
        res
          .status(406)
          .json({
            status: 406,
            message: "Not Acceptable Error User Create",
            data: err,
          });
      } else {
        res
          .status(200)
          .json({
            status: 200,
            message: " Acceptable User creates",
            data: item,
          });
      }
    });
  },

  update: function (req, res) {
    SubCategory.findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true}, (err, item) => {
      if (err) {
        console.log('Error: ' + err);
        res
          .status(406)
          .json({
            status: 400,
            message: "Not Acceptable Error User Create",
            data: null,
          });
      } else {
        res
          .status(200)
          .json({ status: 200, message: "User Updated", data: item });
      }
    });
  },

  delete: function (req, res) {
    SubCategory.findByIdAndDelete(
      {
        _id: req.params.id,
      },
      (err) => {
        if (err) {
          console.log("Eroor : " + err);
          res
            .status(406)
            .json({
              status: 406,
              message: "Not Acceptable Error User Create",
              data: null,
            });
        } else {
          console.log("Eroor : " + err);
          res.status(200).json({
            status: 200,
            message: "User deleted",
            data: null,
          });
        }
      }
    );
  },

  read: function (req, res) {
    SubCategory.find({}, (err, docs) => {
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
};
