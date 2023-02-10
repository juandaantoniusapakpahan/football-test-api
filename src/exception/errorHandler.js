const errorHandler = (error, req, res, next) => {
  console.log(error);

  if (error.name === "InvariantError") {
    return res.status(error.statusCode).send({
      status: "fail",
      message: error.message,
    });
  }

  if (error.name === "NotFoundError") {
    return res.status(error.statusCode).send({
      status: "fail",
      message: error.message,
    });
  }

  if (error.name === "AuthenticationError") {
    return res.status(error.statusCode).send({
      status: "fail",
      message: error.message,
    });
  }

  if (error.name === "AuthorizationError") {
    return res.status(error.statusCode).send({
      status: "fail",
      message: error.message,
    });
  }
  res.status(error.statusCode).send(error.message);
};

module.exports = errorHandler;
