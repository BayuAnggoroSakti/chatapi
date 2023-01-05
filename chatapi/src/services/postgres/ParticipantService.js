const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ParticipantService {
  constructor() {
    this._pool = new Pool();
  }

  async addParticipant(
    userId, conversationId, addedBy,
  ) {
    const isParticipantExist = await this.isParticipantExist(userId, conversationId);
    if (isParticipantExist === 0) {
      const id = `participant-${nanoid(16)}`;
      const joinTime = new Date().toISOString();
      const query = {
        text: 'INSERT INTO msg_participants VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
        values: [id, userId, conversationId, joinTime, addedBy, 0],
      };

      const result = await this._pool.query(query);

      if (!result.rows[0].id) {
        throw new InvariantError('participant gagal ditambahkan');
      }

      return result.rows[0].id;
    }
    return 0;
  }

  async isParticipantExist(userId, conversationId) {
    const query = {
      text: 'SELECT id FROM msg_participants WHERE user_id = $1 and conversation_id = $2',
      values: [userId, conversationId],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      return 1;
    }
    return 0;
  }

  async checkParticipantExistInConversationId(id, userId) {
    const query = {
      text: 'SELECT * FROM msg_participants where conversation_id = $1 and user_id = $2',
      values: [id, userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('participan tidak ditemukan di dalam conversation ini');
    }

    return result.rows[0];
  }

  async doUnreadParticipant(sentTo, id) {
    const query = {
      text: 'UPDATE msg_participants SET is_unread = is_unread+1 WHERE user_id = $1 and conversation_id = $2 RETURNING id',
      values: [sentTo, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui last_acvitiy. conversation_id tidak ditemukan.');
    }
  }
}

module.exports = ParticipantService;
