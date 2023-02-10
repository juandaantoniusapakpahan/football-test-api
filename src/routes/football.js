const express = require("express");
const router = express.Router();

const {
  RecordGame,
  AllLeagueStandings,
  ClubStandings,
} = require("../controllers/Football/FootballController");

router.route("/football/recordgame").post(RecordGame);

router.route("/football/leaguestanding").get(AllLeagueStandings);

router.route("/football/rank").get(ClubStandings);

module.exports = router;
