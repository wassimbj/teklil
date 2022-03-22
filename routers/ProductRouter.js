const ProductController=require("../controllers/ProductController")
const express=require("express");
const router=express.Router();

router.post("/",ProductController.create);
router.put("/:id",ProductController.update);
router.delete("/:id",ProductController.delete);
router.get("/",ProductController.read);

module.exports=router;