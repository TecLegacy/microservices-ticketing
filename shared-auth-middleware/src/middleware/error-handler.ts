import { Response, Request, NextFunction } from 'express';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseValidationError } from '../errors/database-validation-error';
import { CustomError } from '../errors/custom-error-abstract';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({
      error: err.serializedError(),
      // logs: err?.message,
    });
    // const formattedError = err.error.map(error => {
    //   if (error.type === 'field') {
    //     return {
    //       message: error.msg,
    //       field: error.path,
    //     };
    //   }
    // });
    // return res.status(400).send({
    //   error: formattedError,
    // });
  }

  // if (err instanceof DatabaseValidationError) {
  //   res.status(err.statusCode).send(err.serializedError());
  // }

  res.status(400).send({ message: err.message });
};
