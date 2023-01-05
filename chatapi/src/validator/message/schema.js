const Joi = require('joi');

const SendMessagePayloadSchema = Joi.object({
  sentTo: Joi.string().required(),
  message: Joi.string().required(),
});

const ReplyMessagePayloadSchema = Joi.object({
  conversationId: Joi.string().required(),
  message: Joi.string().required(),
});

module.exports = { SendMessagePayloadSchema, ReplyMessagePayloadSchema };
