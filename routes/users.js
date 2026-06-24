import { Router } from 'express';
import { deleteUser, getAllUsers, registerUser, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/allowRoles.js';
const router = Router();

// get all users
router.post("/", registerUser);

router.get("/", authMiddleware,allowRoles("admin"), getAllUsers);

router.patch("/:userId", authMiddleware, updateUser);

router.delete("/:userId", authMiddleware, deleteUser);


export default router;
