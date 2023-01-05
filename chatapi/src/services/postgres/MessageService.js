const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class MessageService {
  constructor() {
    this._pool = new Pool();
  }

  async addMessage(
    sender, conversationId, message,
  ) {
    const id = `message-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO chat_message VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, sender, conversationId, message],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Message gagal ditambahkan');
    }

    return result.rows[0];
  }

  async getMessageById(id) {
    const query = {
      text: 'SELECT * FROM chat_message where id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('message tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteMessageById(id) {
    const query = {
      text: 'DELETE FROM chat_message where id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Message gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = MessageService;
