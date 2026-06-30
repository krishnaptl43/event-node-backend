import { Router } from 'express';
import { deleteEvent, getAllEvents, registerEvent, updateEvent, cancelEvent } from '../controllers/eventController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/allowRoles.js';
import { userUpload } from '../config/multer.js';

const router = Router();

// get all events public
router.get("/", getAllEvents);

router.use("/admin", authMiddleware, allowRoles("admin"));

// add event by admin
router.post("/admin", registerEvent);

router.patch("/admin/:EventId", authMiddleware, allowRoles("admin", "user"), updateEvent);

router.delete("/admin/:EventId", authMiddleware, allowRoles("user"), deleteEvent);

router.patch("/admin/cancel/:EventId", authMiddleware, allowRoles("user"), cancelEvent);

export default router;
