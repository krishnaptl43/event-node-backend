import { Router } from 'express';
const router = Router();

// get all users
router.get("/", getAllUsers);

router.post("/", registerUser);

router.patch("/:userId", updateUser);

router.delete("/:userId", deleteUser);

export default router;
