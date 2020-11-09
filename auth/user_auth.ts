import joi from '@hapi/joi';

const user_auth_schema=joi.object({
    USER_NAME: joi.string().min(8).required(),
      AGE: joi.number().required(),
      FULL_NAME: joi.string().min(6).required(),
      LOCATION: joi.string().min(4).required(),
     CONTACT_NUMBER: joi.number().required(),
      PASSWORD:joi.string().min(8).required(),
      EMAIL:joi.string().min(6).required().email()
    
});

export default user_auth_schema;