const BigPromise = require("../../middlewares/bigPromise");
const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const footBallValidator = require("../../domain/football/FootballValidator");
const format = require("pg-format");

const _pool = new Pool();

const _addGameRecordPoint = async (
  gameRecodeId,
  { clubhomename, clubawayname, score }
) => {
  try {
    const gameRecordPointId1 = nanoid(16);
    const gameRecordPointId2 = nanoid(16);

    const scores = score.split(" ");
    const finalIpunt = [];

    if (parseInt(scores[0]) < parseInt(scores[2])) {
      finalIpunt.push([gameRecordPointId1, gameRecodeId, clubhomename, 0]);
      finalIpunt.push([gameRecordPointId2, gameRecodeId, clubawayname, 3]);
    } else if (parseInt(scores[0]) > parseInt(scores[2])) {
      finalIpunt.push([gameRecordPointId1, gameRecodeId, clubhomename, 3]);
      finalIpunt.push([gameRecordPointId2, gameRecodeId, clubawayname, 0]);
    } else {
      finalIpunt.push([gameRecordPointId1, gameRecodeId, clubhomename, 1]);
      finalIpunt.push([gameRecordPointId2, gameRecodeId, clubawayname, 1]);
    }

    let query = format(
      "INSERT INTO game_record_points (id,game_record_id, clubname, point) VALUES %L",
      finalIpunt
    );

    await _pool.query(query);
  } catch (error) {
    console.log(error);
  }
};

exports.RecordGame = BigPromise(async (req, res, next) => {
  try {
    footBallValidator._verifyPayload(req.body);
    const { clubhomename, clubawayname, score } = req.body;

    const gameRecodeId = `record-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const queryRecord = {
      text: "INSERT INTO game_records VALUES ($1, $2, $3, $4, $5) RETURNING id",
      values: [gameRecodeId, clubhomename, clubawayname, score, createdAt],
    };

    const result = await _pool.query(queryRecord);

    await _addGameRecordPoint(gameRecodeId, req.body);

    const game_record = result.rows[0];

    res.status(201).json({
      status: "success",
      message: "Game was created",
      data: {
        game_record,
      },
    });
  } catch (error) {
    next(error);
  }
});

exports.AllLeagueStandings = BigPromise(async (req, res, next) => {
  const result =
    await _pool.query(`SELECT clubname, sum(point) points FROM game_record_points 
  group by clubname order by points desc`);

  const standings = result.rows;
  res.status(200).json(standings);
});

exports.ClubStandings = BigPromise(async (req, res, next) => {
  const { clubname } = req.query;

  const query = {
    text: `select rst.clubname, rst.standing from (select clubname,row_number () over (order by sum(point) desc) as standing from game_record_points 
    group by clubname order by sum(point) desc) rst WHERE LOWER (rst.clubname) LIKE LOWER($1)`,
    values: [`%${clubname}`],
  };
  const result = await _pool.query(query);

  const standing = result.rows[0];

  res.status(200).json([standing]);
});
