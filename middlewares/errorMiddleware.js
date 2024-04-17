const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "BACKEND ERROR";
  const extraDetails = error.extraDetails || "Error from backend";

  // console.log("hellow");
  // console.log(status, message, extraDetails);

  return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
