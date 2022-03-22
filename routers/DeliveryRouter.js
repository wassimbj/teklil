const DeliveryController=require("../controllers/DeliveryController")
const upload=require("../middlewares/uploadFile")//save file photo
const express=require("express");
const router=express.Router();

router.post("/",upload.single("photo"),DeliveryController.create);
router.put("/:id",DeliveryController.update);
router.delete("/:id",DeliveryController.delete);
router.get("/",DeliveryController.read);

module.exports=router;