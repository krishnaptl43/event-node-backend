import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/allowRoles.js';
import { eventUpload } from '../config/multer.js';
import {
    deleteEvent,
    getAllEvents,
    registerEvent,
    updateEvent,
    cancelEvent,
    eventThumbnailUpload,
    eventImagesUpload,
    myEvents
} from '../controllers/eventController.js';

const router = Router();

// get all events public
router.get("/", getAllEvents);

router.use("/admin", authMiddleware, allowRoles("admin"));

// add event by admin
router.get("/admin", myEvents);

router.post("/admin", registerEvent);

router.patch("/admin/:EventId", updateEvent);

router.delete("/admin/:EventId", deleteEvent);

router.patch("/admin/cancel/:EventId", cancelEvent);

router.patch("/admin/upload_thumbnail/:EventId", eventUpload.single("thumbnail"), eventThumbnailUpload);

router.patch("/admin/upload_images/:EventId", eventUpload.array("images", 5), eventImagesUpload);

export default router;
