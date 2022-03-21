const Joi = require('joi')  

//Email Validation
const emailValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6) .required() .email()
    });
    return schema.validate(data)
}
module.exports.emailValidation = emailValidation