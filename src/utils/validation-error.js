// const { StatusCodes } = require("http-status-codes");
// const AppErrors = require("./error-handler");

// class ValidationError extends AppErrors {
//   constructor(error) {
//     let errorName = error.name;
//     let explanation = [];
//     let e = error.error;

//     e.errors.forEach((err) => {
//       explanation.push(err.message);
//     });

//     super(
//       errorName,
//       "Not abe to validate the data sent in the request",
//       explanation,
//       StatusCodes.BAD_REQUEST
//     );
//   }
// }

// module.exports = ValidationError;

const { StatusCodes } = require("http-status-codes");

const AppErrors = require("./error-handler");

class ValidationError extends AppErrors {
  constructor(error) {
    // error is the SequelizeValidationError
    const { name: errorName, errors = [] } = error;

    // Map messages directly from SequelizeValidationErrorItem
    const explanation = errors.map((err) => err.message);

    super(
      errorName,
      "Not able to validate the data sent in the request",
      explanation,
      StatusCodes.BAD_REQUEST
    );
  }
}

module.exports = ValidationError;
