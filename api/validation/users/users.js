const Joi = require('joi')  

//User Validation
const userRegisterValidation = data => {
    const schema = Joi.object({ 
        name: Joi.string() .required(),
        email: Joi.string().min(6) .required() .email(),
        password: Joi.string() .min(6) .required()
    });
    return schema.validate(data)
}

module.exports.userRegisterValidation = userRegisterValidation