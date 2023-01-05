exports.up = (pgm) => {
  pgm.createTable('chat_message', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    sender: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    conversation_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    message: {
      type: 'TEXT',
      notNull: false,
    },
    time: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('chat_message');
};
