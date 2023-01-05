const InvariantError = require('../../exceptions/InvariantError');
const { SendMessagePayloadSchema, ReplyMessagePayloadSchema } = require('./schema');

const MessageValidator = {
  validateSendMessagePayload: (payload) => {
    const validationResult = SendMessagePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateReplyMessagePayload: (payload) => {
    const validationResult = ReplyMessagePayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MessageValidator;
