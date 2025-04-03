const Joi = require("joi");
const userValidate = Joi.object({
    fullname:Joi.object({
        firstname:Joi.string().min(3).required(),
        lastname:Joi.string().min(3)
    }),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(5)
})
module.exports = userValidate;