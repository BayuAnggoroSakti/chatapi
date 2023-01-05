const routes = (handler) => [
  {
    method: 'POST',
    path: '/message/send',
    handler: handler.postSendMessageHandler,
    options: {
      auth: 'chatapi_jwt',
    },
  },
  {
    method: 'POST',
    path: '/message/reply',
    handler: handler.postReplyMessageHandler,
    options: {
      auth: 'chatapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/message/conversation/{id}',
    handler: handler.getMessageFromConversationHandler,
    options: {
      auth: 'chatapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/message/conversation',
    handler: handler.getMessageFromConversationWithInvolvedHandler,
    options: {
      auth: 'chatapi_jwt',
    },
  },
];

module.exports = routes;
