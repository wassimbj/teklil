const ClientController=require("../controllers/ClientController")
const upload=require("../middlewares/uploadFile")//save file photo
const express=require("express");
const router=express.Router();

router.post("/",upload.single("photo"),ClientController.create);
router.put("/:id",ClientController.update);
router.delete("/:id",ClientController.delete);
router.get("/",ClientController.read);

module.exports=router;