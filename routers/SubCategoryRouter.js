const SubCategoryController=require("../controllers/SubCategoryController")
const express=require("express");
const router=express.Router();

router.post("/",SubCategoryController.create);
router.put("/:id",SubCategoryController.update);
router.delete("/:id",SubCategoryController.delete);
router.get("/",SubCategoryController.read);

module.exports=router;