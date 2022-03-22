const Order = require("../models/Order");
const clientModel = require("../models/Client");

module.exports = {
  create: function (req, res) {
    const user = new Order(req.body);
    user.save(req.body,async function (err, item) {
      if (err) {
        res.status(406).json({
          status: 406,
          message: "Not Acceptable Error User Create",
          data: err,
        });
      } else {
        const Client =await clientModel.findById({_id: item.clientModel })
        Client.orders.push(item)
        const c=await Client.save()
        console.log("client",c)
        res.status(200).json({
          status: 200,
          message: " Acceptable User creates",
          data: item,
        });
      }
    });
  },

  update: function (req, res) {
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, item) => {
        if (err) {
          console.log("Error: " + err);
          res.status(406).json({
            status: 400,
            message: "Not Acceptable Error User Create",
            data: null,
          });
        } else {
          res
            .status(200)
            .json({ status: 200, message: "User Updated", data: item });
        }
      }
    );
  },

  delete: function (req, res) {
    Order.findByIdAndDelete(
      {
        _id: req.params.id,
      },
      (err) => {
        if (err) {
          console.log("Eroor : " + err);
          res.status(406).json({
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
    Order.find({}, (err, docs) => {
      if (err) {
        console.log(`Error: ` + err);
        res.status(406).json({
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
    })
      .populate("client")//affiche more info populate**
      .populate({
        path: "products",
        populate: "product", 
      });
  },
};
