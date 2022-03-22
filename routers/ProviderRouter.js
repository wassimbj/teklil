const ProviderController=require("../controllers/ProviderController")
const upload=require("../middlewares/uploadFile")//save file photo
const express=require("express");
const router=express.Router();

router.post("/",upload.single("photo"),ProviderController.create);
router.put("/:id",ProviderController.update);
router.delete("/:id",ProviderController.delete);
router.get("/",ProviderController.read);

module.exports=router;