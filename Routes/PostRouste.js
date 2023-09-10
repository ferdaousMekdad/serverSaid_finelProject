import express from "express";
import { CreatePost, deletePost,updateRecipe, getPost, likePost, updatePost ,CreateRecipe,GetRecipe} from "../Controllers/PostController.js";

const router =express.Router()

router.post("/create",CreatePost)
router.get("/:id",getPost)
router.put("/:id",updatePost)
router.put("/updateRecipe/:id",updateRecipe)
router.delete("/:id",deletePost)
router.put("/:id/like",likePost)
router.post("/createRecipe",CreateRecipe)
router.get("/",GetRecipe)

export default router;