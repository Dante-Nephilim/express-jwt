import joi from '@hapi/joi';

const login_auth_schema=joi.object({

      PASSWORD:joi.string().min(8).required(),
      EMAIL:joi.string().min(6).required().email()
    
});

export default login_auth_schema;