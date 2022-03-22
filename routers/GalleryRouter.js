const GalleryController=require("../controllers/GalleryController")
const express=require("express");
const router=express.Router();

router.post("/",GalleryController.create);
router.put("/:id",GalleryController.update);
router.delete("/:id",GalleryController.delete);
router.get("/",GalleryController.read);

module.exports=router;