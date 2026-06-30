export async function registerEvent(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let hash = await generatHash(password);

        let user = await userModel.create({ email, name, password: hash });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function updateEvent(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let hash = await generatHash(password);

        let user = await userModel.create({ email, name, password: hash });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function deleteEvent(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let hash = await generatHash(password);

        let user = await userModel.create({ email, name, password: hash });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function cancelEvent(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let hash = await generatHash(password);

        let user = await userModel.create({ email, name, password: hash });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}

export async function getAllEvents(req, res, next) {
    try {
        const { email, name, password } = req.body;

        let hash = await generatHash(password);

        let user = await userModel.create({ email, name, password: hash });

        res.status(201).json(new ApiResponse(true, user, "success"));

    } catch (error) {
        res.status(500).json(new ApiResponse(false, null, error.message || "Internal server Error"))
    }
}