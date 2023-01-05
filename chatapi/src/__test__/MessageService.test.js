const MessageService = require('../services/postgres/MessageService');
const InvariantError = require('../exceptions/InvariantError');
require('dotenv').config();

describe('Message Scenario', () => {
  const messageService = new MessageService();

  test('Adding message', async () => {
    const sender = 'user-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const message = 'halo guys';
    const result = await messageService.addMessage(sender, conversationId, message);
    expect(result).not.toBeUndefined();
  });

  test('Get message with valid id', async () => {
    const messageId = 'meessage-3168hhkjkg8hh';
    const result = await messageService.getMessageById(messageId);
    expect(result).not.toBeUndefined();
  });

  test('Get message with id not found', async () => {
    const messageId = 'meessage-1ss68hdfhkjkg8hh';
    const result = await messageService.getMessageById(messageId);
    expect(() => result).toThrow(new InvariantError('Message ID tidak ditemukan.'));
  });
});
