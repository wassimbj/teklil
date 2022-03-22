const UserController=require("../controllers/UserController")
const express=require("express");
const router=express.Router();


router.post("/login",UserController.login);
router.post("/refreshtoken",UserController.refreshtoken);
router.post("/logout",UserController.logout);
router.get("/",UserController.read);
module.exports=router;