/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("game_records", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    clubhomename: {
      type: "TEXT",
      notNull: true,
    },
    clubawayname: {
      type: "TEXT",
      notNull: true,
    },
    score: {
      type: "TEXT",
      notNull: true,
    },
    created_at: {
      type: "TEXT",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("game_records");
};
