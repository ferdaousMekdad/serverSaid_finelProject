import express from "express";
import { CreatePost, deletePost, getPost, likePost, updatePost ,CreateRecipe,GetRecipe} from "../Controllers/PostController.js";

const router =express.Router()

router.post("/",CreatePost)
router.get("/:id",getPost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.put("/like",likePost)
router.post("/createRecipe",CreateRecipe)
router.get("/",GetRecipe)

export default router;