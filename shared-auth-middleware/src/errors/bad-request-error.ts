import { CustomError } from './custom-error-abstract';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public loggingMessage: string) {
    super(loggingMessage);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializedError() {
    return [
      {
        message: this.loggingMessage || 'Something went wrong',
      },
    ];
  }
}
