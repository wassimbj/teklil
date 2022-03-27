import express from "express";
import PostController from "../app/controllers/PostController";
const router = express.Router();

router.get("/posts", PostController.get);

router.post("/post/create", PostController.create);

router.post("/post/clean", PostController.clean);

export default router;
