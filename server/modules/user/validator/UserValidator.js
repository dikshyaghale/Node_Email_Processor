const Joi = require("joi");

const validateUser = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(5)
            .max(255)
            .regex(/\S+@\S+\.\S+/)
            .message("Email is invalid"),
        password: Joi.string().min(5).max(255).required(),
        fullName: Joi.string().required(),
        phone: Joi.string()
            .min(10)
            .max(10)
            .regex(/(?:\+977[- ])?\d{2}-?\d{7,8}/)
            .required()
            .error((er) => {
                return er;
            }),
    });
    return schema.validate(user, { stripUnknown: true });
};

const validateAuthUser = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required(),
        password: Joi.string().min(5).max(255).required(),
    });

    return schema.validate(user, { stripUnknown: true });
};

module.exports = {
    validateUser,
    validateAuthUser,
};
