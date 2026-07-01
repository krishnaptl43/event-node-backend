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

router.patch("/admin/:EventId", updateEvent);

router.delete("/admin/:EventId", deleteEvent);

router.patch("/admin/cancel/:EventId", cancelEvent);

export default router;
