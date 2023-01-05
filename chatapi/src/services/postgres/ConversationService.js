/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class ConversationService {
  constructor() {
    this._pool = new Pool();
  }

  async addConversation(
    createdBy, sentTo,
  ) {
    const id = `conversation-${nanoid(16)}`;
    const createdDate = new Date().toISOString();
    const lastActivity = createdDate;
    const query = {
      text: 'INSERT INTO msg_conversation VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, createdDate, createdBy, sentTo, lastActivity],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('conversation gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async checkConversationExist(createdBy, sentTo) {
    const query = {
      text: 'SELECT id FROM msg_conversation WHERE created_by = $1 and sent_to = $2',
      values: [createdBy, sentTo],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      return result.rows[0].id;
    }
    return null;
  }

  async getConversationById(id) {
    const query = {
      text: 'SELECT * FROM msg_conversation where id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('conversationId tidak ditemukan');
    }

    return result.rows[0];
  }

  async updateLastActivity(id) {
    const lastActivity = new Date().toISOString();
    const query = {
      text: 'UPDATE msg_conversation SET last_activity = $1 WHERE id = $2 RETURNING id',
      values: [lastActivity, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui last_acvitiy. Id tidak ditemukan.');
    }
  }

  async getMessageToConversation(id) {
    const query = {
      text: 'SELECT msg_conversation.*, fullname FROM msg_conversation inner join users on users.id = msg_conversation.created_by  where msg_conversation.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('conversationId tidak ditemukan');
    }
    const rowId = result.rows[0].id;
    const rowCreatedDate = result.rows[0].created_date;
    const rowCreatedBy = result.rows[0].fullname;
    const queryMessage = {
      text: 'SELECT conversation_id,fullname as sender, phone_number, message, chat_message.time FROM chat_message inner join users on users.id = chat_message.sender where chat_message.conversation_id = $1',
      values: [id],
    };
    const resultMessage = await this._pool.query(queryMessage);
    let _messages = [];
    if (resultMessage.rowCount) {
      _messages = resultMessage.rows;
    }
    const getMessageMap = {
      id: rowId, createdBy: rowCreatedBy, createdDate: rowCreatedDate, messages: _messages,
    };
    return getMessageMap;
  }

  async getMessageToConversationWithInvolved(userId) {
    const query = {
      text: 'SELECT conversation_id, is_unread from msg_participants where user_id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Belum ada data conversation');
    }
    let conversations = [];
    conversations = result.rows;
    const resultMap = [];
    for (let index = 0; index < conversations.length; index++) {
      const conversationId = conversations[index].conversation_id;
      const isUnread = conversations[index].is_unread;
      const queryMessage = {
        text: 'SELECT fullname as sender, message, time FROM chat_message inner join users on users.id = chat_message.sender where conversation_id = $1 ORDER BY time desc LIMIT 1',
        values: [conversationId],
      };
      const resultMessage = await this._pool.query(queryMessage);
      let _Lastmessages = [];
      if (resultMessage.rowCount) {
        _Lastmessages = resultMessage.rows;
      }
      const getConversationeMap = {
        conversation_id: conversationId, unread_count: isUnread, lastMessage: _Lastmessages[0],
      };
      resultMap.push(getConversationeMap);
    }

    return resultMap;
  }
}

module.exports = ConversationService;
