/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("game_record_points", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    game_record_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    clubname: {
      type: "TEXT",
      notNull: true,
    },
    point: {
      type: "integer",
      notNull: true,
    },
  });

  pgm.addConstraint(
    "game_record_points",
    "game_record_points.game_record_id.id",
    "FOREIGN KEY (game_record_id) REFERENCES game_records (id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("game_record_points");
  pgm.dropConstraint(
    "game_record_points",
    "game_record_points.game_record_id.id"
  );
};
