import Joi from "joi";


export const registerUserValidationSchema:Joi.ObjectSchema<any> = Joi.object({
  firstname: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'any.required': 'Please enter firstname',
      'string.empty': 'Firstname cannot be empty',
      'string.min': 'Firstname must be at least 2 characters long',
      'string.max': 'Firstname cannot exceed 50 characters'
    }),
  
  lastname: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .required()
    .messages({
      'any.required': 'Please enter lastname', 
      'string.empty': 'Lastname cannot be empty',
      'string.min': 'Lastname must be at least 2 characters long',
      'string.max': 'Lastname cannot exceed 50 characters'
    }),
  
  email: Joi.string()
    .email()
    .trim()
    .required()
    .lowercase()
    .messages({
      'any.required': 'Please enter an email',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty'
    }),
  
  username: Joi.string()
    .trim()
    .min(3)
    .max(20)
    .pattern(new RegExp('^[a-zA-Z0-9_]+$'))
    .required()
    .messages({
      'any.required': 'Please enter a username',
      'string.empty': 'Username cannot be empty',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot exceed 20 characters',
      'string.pattern.base': 'Username can only contain letters, numbers, and underscores'
    }),
  
  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
    .required()
    .messages({
      'any.required': 'Please enter a password',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password cannot exceed 30 characters',
      'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character'
    })
});


export const loginValidationSchema = Joi.object({

  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be empty'
    }),

  password: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Please enter a password',
      'string.empty': 'Password cannot be empty'
    })
})