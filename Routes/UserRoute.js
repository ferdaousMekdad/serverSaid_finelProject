import express  from "express";

import { GetUser, deleteUser, updateUser,GetUserInfo } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";
const router=express.Router();

router.get("/:id",GetUser)
router.put("/:id",authMiddleWare,updateUser)
router.delete("/:id",deleteUser)
router.get("/:id/getuserinfo",GetUserInfo)

export default router; 