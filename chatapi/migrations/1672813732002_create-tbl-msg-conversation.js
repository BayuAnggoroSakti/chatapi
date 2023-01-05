exports.up = (pgm) => {
  pgm.createTable('msg_conversation', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    created_date: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    created_by: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    sent_to: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    last_activity: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('msg_conversation');
};
