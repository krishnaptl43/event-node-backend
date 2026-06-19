import { verifyHash } from "../config/bcrypt.js";
import { generateToken } from "../config/jwt.js";
import userModel from "../models/user.js";
import { ApiResponse } from "../utils/resPattern.js";

export async function authController(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new ApiResponse(false, null, "Email and Password are required !"))
        }

        let user = await userModel.findOne({ email, isDeleted: false });

        if (!user) return res.status(404).json(new ApiResponse(false, null, "user not Found !"));
        
        user = user.toObject();
        
        let match = await verifyHash(password, user.password);

        if (!match) return res.status(401).json(new ApiResponse(false, null, "Incorrect Password"));

        let accessToken = generateToken({
            name: user.name,
            id: user._id,
            role: user.role
        })

        delete user.__v
        delete user.password

        user.accessToken = accessToken;

        res.status(200).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}