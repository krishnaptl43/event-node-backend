import eventModel from "../models/event.model.js";
import { ApiResponse } from "../utils/resPattern.js";
import fs from "fs";

export async function registerEvent(req, res, next) {
    try {
        const { title, description, date, location, vip_ticket_price, general_ticket_price, total_vip_tickets, total_general_tickets, highlights, category } = req.body;

        if (!title || !description || !date || !location || !vip_ticket_price || !general_ticket_price || !total_vip_tickets || !total_general_tickets) {
            return res.status(400).json(new ApiResponse(false, null, "All fields are required"));
        }

        let event = await eventModel.create({
            title,
            description,
            date,
            location,
            vip_ticket_price,
            general_ticket_price,
            total_vip_tickets,
            total_general_tickets,
            highlights,
            category,
            createdBy: req.user._id
        });

        res.status(201).json(new ApiResponse(true, event, "event created success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateEvent(req, res, next) {
    try {
        const {
            title,
            description,
            date,
            location,
            vip_ticket_price,
            general_ticket_price,
            total_vip_tickets,
            total_general_tickets,
            highlights,
            category,
            reporting_time,
            time,
            isCompleted,
            isOngoing,
            isUpcoming,
            isCancelled
        } = req.body;

        let event = await eventModel.findByIdAndUpdate(req.params.EventId, {
            title,
            description,
            date,
            location,
            vip_ticket_price,
            general_ticket_price,
            total_vip_tickets,
            total_general_tickets,
            highlights,
            category,
            reporting_time,
            time,
            isCompleted,
            isOngoing,
            isUpcoming,
            isCancelled
        }, { returnDocument: "after" });

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found"));
        }

        res.status(200).json(new ApiResponse(true, event, "event updated successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteEvent(req, res, next) {
    try {

        let event = await eventModel.findByIdAndDelete(req.params.EventId);

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found"));
        }

        res.status(200).json(new ApiResponse(true, event, "event deleted successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function cancelEvent(req, res, next) {
    try {

        let isCancelled = req.query.cancelled === "true" ? true : false;

        let event = await eventModel.findByIdAndUpdate(req.params.EventId, { isCancelled, isUpcoming: false }, { returnDocument: "after" });

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found"));
        }

        res.status(200).json(new ApiResponse(true, event, "event cancelled successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getAllEvents(req, res, next) {
    try {
        let page = req.query.page > 0 ? req.query.page : 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25
        let skip = page === 1 ? 0 : (page - 1) * limit

        let events = await eventModel.find()
            .populate("createdBy", "name email role _id")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        let totalEvents = await eventModel.countDocuments();


        res.status(200).json(new ApiResponse(true, { page, limit, events, totalEvents }, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function eventThumbnailUpload(req, res, next) {
    try {
         const thumbnailFile = req.file;

        if (!thumbnailFile) {
            return res.status(400).json(new ApiResponse(false, null, "No thumbnail file uploaded"));
        }

        const fileUrl = `${req.protocol}://${req.host}/${thumbnailFile.destination}/${thumbnailFile.filename}`;
        
        let event = await eventModel.findByIdAndUpdate(req.params.EventId, { thumbnail: fileUrl }, { returnDocument: "before" });

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found"));
        }

        event = event.toObject();

        // previous thumbnail file deletion logic can be added here if needed
        if(event.thumbnail) {
            const previousThumbnailPath = event.thumbnail.replace(`${req.protocol}://${req.host}/`, '');
            fs.unlinkSync(previousThumbnailPath);
        }

        event.thumbnail = fileUrl;

        res.status(200).json(new ApiResponse(true, event, "event thumbnail uploaded successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function eventImagesUpload(req, res, next) {
    try {
        const imageFiles = req.files;

        if (!imageFiles || imageFiles.length === 0) {
            return res.status(400).json(new ApiResponse(false, null, "No image files uploaded"));
        }

        const fileUrls = imageFiles.map(file => `${req.protocol}://${req.host}/${file.destination}/${file.filename}`);

        let event = await eventModel.findByIdAndUpdate(req.params.EventId, { images: fileUrls }, { returnDocument: "before" });

        if (!event) {
            return res.status(404).json(new ApiResponse(false, null, "event not found"));
        }

        event = event.toObject();

        // previous image file deletion logic can be added here if needed
        if (event.images && event.images.length > 0) {
            event.images.forEach(imageUrl => {
                const previousImagePath = imageUrl.replace(`${req.protocol}://${req.host}/`, '');
                fs.unlinkSync(previousImagePath);
            });
        }

        event.images = fileUrls;

        res.status(200).json(new ApiResponse(true, event, "event images uploaded successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function myEvents(req, res, next) {
    try {
        let page = req.query.page > 0 ? req.query.page : 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25
        let skip = page === 1 ? 0 : (page - 1) * limit

        let events = await eventModel.find({ createdBy: req.user._id })
            .populate("createdBy", "name email role _id")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        let totalEvents = await eventModel.countDocuments({ createdBy: req.user._id });


        res.status(200).json(new ApiResponse(true, { page, limit, events, totalEvents }, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}