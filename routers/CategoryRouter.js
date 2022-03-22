const CategoryController=require("../controllers/CategoryController")
const upload=require("../middlewares/uploadFile")// save photo
const express=require("express");
const router=express.Router();

router.post("/",upload.single("photo"),CategoryController.create);
router.put("/:id",CategoryController.update);
router.delete("/:id",CategoryController.delete);
router.get("/",CategoryController.read);

module.exports=router;