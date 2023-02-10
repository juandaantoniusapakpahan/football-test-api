require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookeiParser = require("cookie-parser");
const app = express();

const Football = require("./routes/football");
const Letter = require("./routes/letter");

const errorHandler = require("./exception/errorHandler");

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(cookeiParser());

/** Router */

app.use("/api/v1", Football);
app.use("/api/v1", Letter);

/** Error Handler */
app.use(errorHandler);

module.exports = app;
