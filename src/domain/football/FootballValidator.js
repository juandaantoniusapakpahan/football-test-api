const Joi = require("joi");
const InvariantError = require("../../exception/InvariantError");

const footBallValidator = {
  _verifyPayload: (payload) => {
    const schema = Joi.object({
      clubhomename: Joi.string().required(),
      clubawayname: Joi.string().required(),
      score: Joi.string().required(),
    });

    const result = schema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = footBallValidator;
