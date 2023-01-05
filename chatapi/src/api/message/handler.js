/* eslint-disable max-len */
const autoBind = require('auto-bind');

class MessageHandler {
  constructor(messageService, conversationService, usersService, participantService, validator) {
    this._messageService = messageService;
    this._conversationService = conversationService;
    this._usersService = usersService;
    this._participantService = participantService;
    this._validator = validator;

    autoBind(this);
  }

  async postSendMessageHandler(request, h) {
    this._validator.validateSendMessagePayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { sentTo, message } = request.payload;

    // checkUserExist
    await this._usersService.getUserById(sentTo);

    // check conversation exist
    // eslint-disable-next-line max-len
    let idConversation = await this._conversationService.checkConversationExist(credentialId, sentTo);
    if (idConversation == null) {
      idConversation = await this._conversationService.addConversation(credentialId, sentTo);
    }
    const messageReturn = await this._messageService.addMessage(credentialId, idConversation, message);
    // insert participant
    await this._participantService.addParticipant(sentTo, idConversation, credentialId);
    await this._participantService.addParticipant(credentialId, idConversation, credentialId);

    // update last_activity di conversation
    await this._conversationService.updateLastActivity(idConversation);

    // is unread ++ di sentTo id
    await this._participantService.doUnreadParticipant(sentTo, idConversation);

    return h.response({
      status: 'success',
      message: 'Pesan berhasil di kirimkan',
      data: {
        messageReturn,
      },
    }).code(201);
  }

  async postReplyMessageHandler(request, h) {
    this._validator.validateReplyMessagePayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { conversationId, message } = request.payload;

    // check exist conversation by id
    await this._conversationService.getConversationById(conversationId);

    // check exist participant in conversation id
    await this._participantService.checkParticipantExistInConversationId(conversationId, credentialId);

    const messageReturn = await this._messageService.addMessage(credentialId, conversationId, message);
    // update last_activity di conversation
    await this._conversationService.updateLastActivity(conversationId);

    // is unread ++ di sentTo id
    await this._participantService.doUnreadParticipant(credentialId, conversationId);

    return h.response({
      status: 'success',
      message: 'Pesan berhasil di kirimkan',
      data: {
        messageReturn,
      },
    }).code(201);
  }

  async getMessageFromConversationHandler(request, h) {
    this._validator.validateReplyMessagePayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { id: conversationId } = request.params;

    // check exist conversation by id
    await this._conversationService.getConversationById(conversationId);

    // check exist participant in conversation id
    await this._participantService.checkParticipantExistInConversationId(conversationId, credentialId);

    const conversation = await this._conversationService.getMessageToConversation(conversationId);

    return h.response({
      status: 'success',
      message: 'Data ditemukan',
      data: { conversation },
    }).code(201);
  }

  async getMessageFromConversationWithInvolvedHandler(request, h) {
    this._validator.validateReplyMessagePayload(request.payload);
    const { id: credentialId } = request.auth.credentials;

    const conversation = await this._conversationService.getMessageToConversationWithInvolved(credentialId);

    return h.response({
      status: 'success',
      message: 'Data ditemukan',
      data: { conversation },
    }).code(201);
  }
}

module.exports = MessageHandler;
