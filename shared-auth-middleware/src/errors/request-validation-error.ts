import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error-abstract';

// interface CustomError {
//   statusCode: number;
//   serializedError(): {
//     message: string;
//     field?: string;
//   }[];
// }

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private error: ValidationError[]) {
    super('Failed parsing validation Lib');
    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializedError() {
    return this.error.map(err => {
      if (err.type === 'field') {
        return {
          message: err.msg,
          field: err.path,
        };
      }
      return { message: err.msg };
    });
  }
}
