/* eslint-disable max-len */
const ParticipantService = require('../services/postgres/ParticipantService');
const InvariantError = require('../exceptions/InvariantError');
require('dotenv').config();

describe('Participants Scenario', () => {
  const participantService = new ParticipantService();

  test('Adding participant', async () => {
    const userId = 'user-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const addedBy = 'user-9zddmQHQ7B0EhJG';
    const result = await participantService.addParticipant(userId, conversationId, addedBy);
    expect(result).not.toBeUndefined();
  });

  test('Check Participants is Exist', async () => {
    const userId = 'user-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const result = await participantService.isParticipantExist(userId, conversationId);
    expect(result).toBe(1);
  });

  test('Check Participants Not Exist', async () => {
    const userId = 'users-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'convsersation-aaQHQ7B0EhJG';
    const result = await participantService.isParticipantExist(userId, conversationId);
    expect(result).toBe(0);
  });

  test('Check Participants is Exist in conversation Id', async () => {
    const userId = 'user-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'conversation-aaQHQ7B0EhJG';
    const result = await participantService.checkParticipantExistInConversationId(conversationId, userId);
    expect(result).not.toBeUndefined();
  });

  test('Check Participants Not Exist in conversation Id', async () => {
    const userId = 'user-uMZ9zmQHQ7B0EhJG';
    const conversationId = 'conversation-assaQHQ7B0EhJG';
    const result = await participantService.checkParticipantExistInConversationId(conversationId, userId);
    expect(() => result).toThrow(new InvariantError('Message ID tidak ditemukan.'));
  });

  test('Get message with id not found', async () => {
    const messageId = 'meessage-1ss68hdfhkjkg8hh';
    const result = await participantService.getMessageById(messageId);
    expect(() => result).toThrow(new InvariantError('participan tidak ditemukan di dalam conversation ini'));
  });
});
