const Joi = require("joi");

const rideValidationSchema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
        "string.pattern.base": "Invalid user ID format",
    }),

    captain: Joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null, "").messages({
        "string.pattern.base": "Invalid captain ID format",
    }),
    rideType:Joi.string().valid("car","moto","auto").required(),
    pickup: Joi.string().required().messages({
        "any.required": "Pickup location is required",
    }),
    destination: Joi.string().required().messages({
        "any.required": "Destination is required",
    }),
    fare: Joi.number().positive().messages({
        "any.required": "Fare is required",
        "number.positive": "Fare must be a positive number",
    }),
    status: Joi.string()
        .valid("pending", "accepted", "ongoing", "completed", "cancelled")
        .default("pending")
        .messages({
            "any.only": "Invalid status value",
        }),
    duration: Joi.number().integer().min(1).allow(null).messages({
        "number.min": "Duration must be at least 1 second",
    }),

    distance: Joi.number().integer().min(1).allow(null).messages({
        "number.min": "Distance must be at least 1 meter",
    }),

    paymentID: Joi.string().allow(null, "").messages({
        "string.base": "Invalid payment ID format",
    }),

    orderId: Joi.string().allow(null, "").messages({
        "string.base": "Invalid order ID format",
    }),

    signature: Joi.string().allow(null, "").messages({
        "string.base": "Invalid signature format",
    }),

    otp: Joi.string().messages({
        "any.required": "OTP is required",
    }),
});

module.exports = rideValidationSchema;
