const Joi = require("joi");

const captainSchema = Joi.object({
    fullname: Joi.object({
        firstname: Joi.string().min(3).required()
            .messages({ "string.min": "Firstname must be at least 3 characters long" }),
        lastname: Joi.string().min(3).optional()
            .messages({ "string.min": "Lastname must be at least 3 characters long" }),
    }).required(),

    email: Joi.string().email().lowercase().required()
        .messages({ "string.email": "Please enter a valid email" }),

    password: Joi.string().required(), // Add password constraints if needed

    socketId: Joi.string().optional(),

    status: Joi.string().valid("active", "inactive").default("inactive"),

    vehicle: Joi.object({
        color: Joi.string().min(3).required()
            .messages({ "string.min": "Color must be at least 3 characters long" }),
        plate: Joi.string().min(3).required()
            .messages({ "string.min": "Plate must be at least 3 characters long" }),
        capacity: Joi.number().min(1).required()
            .messages({ "number.min": "Capacity must be at least 1" }),
        vehicleType: Joi.string().valid("car", "motorcycle", "auto").required(),
    }).required(),

    location: Joi.object({
        ltd: Joi.number().optional(),
        lng: Joi.number().optional(),
    }).optional(),
});

module.exports = captainSchema