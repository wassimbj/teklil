const OrderController=require("../controllers/OrderController")
const express=require("express");
const router=express.Router();



router.post("/",OrderController.create);
router.put("/:id",OrderController.update);
router.delete("/:id",OrderController.delete);
router.get("/",OrderController.read);

module.exports=router;