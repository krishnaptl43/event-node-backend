import eventModel from "../models/event.model.js";
import { ApiResponse } from "../utils/resPattern.js";

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

        let event = await eventModel.findByIdAndUpdate(req.params.EventId, { isCancelled: true, isUpcoming: false }, { returnDocument: "after" });

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