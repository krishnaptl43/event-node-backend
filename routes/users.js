import { Router } from 'express';
import { deleteUser, getAllUsers, registerUser, updateUser,changePassword,uploadImage } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/allowRoles.js';
import {userUpload} from '../config/multer.js';

const router = Router();

// get all users
router.post("/", registerUser);

router.get("/", authMiddleware, allowRoles("admin"), getAllUsers);

router.patch("/", authMiddleware,allowRoles("admin","user"), updateUser);

router.delete("/", authMiddleware,allowRoles("user"), deleteUser);

router.patch("/change-password", authMiddleware,allowRoles("user","admin"), changePassword);

router.patch("/upload-image", authMiddleware,allowRoles("user","admin"),userUpload.single("image"), uploadImage);

export default router;
