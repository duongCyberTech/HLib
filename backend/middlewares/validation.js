const Joi = require('joi');

const registerSchema = Joi.object({
    fname: Joi.string().required().messages({
        'string.empty': 'First name is required',
        'any.required': 'First name is required'
    }),
    mname: Joi.string().required().messages({
        'string.empty': 'Middle name is required',
        'any.required': 'Middle name is required'
    }),
    lname: Joi.string().required().messages({
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required'
    }),
    password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])'))     // chữ thường
    .pattern(new RegExp('(?=.*[A-Z])'))      // chữ hoa
    .pattern(new RegExp('(?=.*\\d)'))        // số
    .pattern(new RegExp('(?=.*[@$!%*?&])'))  // ký tự đặc biệt
    .min(8)
    .required()
    .messages({
        'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
        'string.min': 'Password must be at least 8 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
});

const validate = () => {
  return (req, res, next) => {
    const schemaCheck = {
        fname: req.body.fname,
        mname: req.body.mname,
        lname: req.body.lname,
        password: req.body.password,
        email: req.body.email,
    }
    const { error } = registerSchema.validate(schemaCheck, { abortEarly: false });
    if (error) {
        console.error('Validation error:', error.details);
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }
    console.log('Validation passed');
    next();
  };
};

module.exports = { registerSchema, validate };
