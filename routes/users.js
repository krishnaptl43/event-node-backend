import { Router } from 'express';
import { deleteUser, getAllUsers, registerUser, updateUser } from '../controllers/userController.js';
const router = Router();

// get all users
router.get("/", getAllUsers);

router.post("/", registerUser);

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);


export default router;
