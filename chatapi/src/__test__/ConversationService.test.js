/* eslint-disable max-len */
const ConversationService = require('../services/postgres/ConversationService');
const InvariantError = require('../exceptions/InvariantError');
require('dotenv').config();

describe('Conversation Scenario', () => {
  const conversationService = new ConversationService();

  test('Adding Conversation', async () => {
    const createdBy = 'user-uMZ9zmQHQ7B0EhJG';
    const sentTo = 'user-9zddmQHQ7B0EhJG';
    const result = await conversationService.addConversation(createdBy, sentTo);
    expect(result).not.toBeUndefined();
  });

  test('Check Conversation is Exist', async () => {
    const createdBy = 'user-uMZ9zmQHQ7B0EhJG';
    const sentTo = 'user-9zddmQHQ7B0EhJG';
    const result = await conversationService.checkConversationExist(createdBy, sentTo);
    expect(result).toBe(1);
  });

  test('Check Conversation Not Exist', async () => {
    const createdBy = 'user-uMZ9zmQHQ7B0EhJG';
    const sentTo = 'user-9zddmQHQ7B0EhJG';
    const result = await conversationService.checkConversationExist(createdBy, sentTo);
    expect(() => result).toThrow(new InvariantError('conversation tidak ditemukan'));
  });

  test('get detail conversation by ID', async () => {
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const result = await conversationService.getConversationById(conversationId);
    expect(result).not.toBeUndefined();
  });

  test('get detail conversation by ID NOT FOUND', async () => {
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const result = await conversationService.getConversationById(conversationId);
    expect(() => result).toThrow(new InvariantError('conversation tidak ditemukan'));
  });
});
