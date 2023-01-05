exports.up = (pgm) => {
  pgm.createTable('msg_participants', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    conversation_id: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    join_time: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    added_by: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    is_unread: {
      type: 'SMALLINT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('msg_participants');
};
