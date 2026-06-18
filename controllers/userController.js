import { ApiResponse } from "../utils/resPattern.js";
import userModel from "../models/user.js"

export async function getAllUsers(req, res, next) {
    try {
        let page = req.query.page > 0 ? req.query.page : 1;
        let limit = req.query.limit <= 100 ? req.query.limit : 25
        let skip = page === 1 ? 0 : (page - 1) * limit

        let users = await userModel.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json(new ApiResponse(true, users, "success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function registerUser(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let user = await userModel.create({ email, name, password });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateUser(req, res, next) {
    try {
        const { userId } = req.params;
        const { } = req.body;

        let user = await userModel.findByIdAndUpdate(userId, {}, { returnDocument: "after" });

        if (!user) return res.status(404).json(new ApiResponse(false, null, "user not found !"))

        res.status(200).json(new ApiResponse(true, user, "updated success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteUser(req, res, next) {
    try {
        const { userId } = req.params;

        let user = await userModel.findByIdAndUpdate(userId, { isDeleted: true }, { returnDocument: "after" });

        if (!user) return res.status(404).json(new ApiResponse(false, null, "user not found !"))

        res.status(200).json(new ApiResponse(true, user, "deleted success"))

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}