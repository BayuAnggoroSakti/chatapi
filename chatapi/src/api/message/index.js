const MessageHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'message',
  version: '1.0.0',
  register: async (server, {
    messageService, conversationService, usersService, participantService, validator,
  }) => {
    const messageHandler = new MessageHandler(
      messageService, conversationService, usersService, participantService, validator,
    );
    server.route(routes(messageHandler));
  },
};
