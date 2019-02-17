const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      console.log("req.body: ", req.body)
      console.log("schema: ", schema)
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        console.log("result.error-----", result.error)
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSignInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    authSignUpSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cfPassword: Joi.string().required()
    })
  }
}