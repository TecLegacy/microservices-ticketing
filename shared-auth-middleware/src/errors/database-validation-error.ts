import { CustomError } from './custom-error-abstract';

export class DatabaseValidationError extends CustomError {
  statusCode = 500;
  reason = 'Connection to data-base failed!';
  constructor(public loggingMessage?: string) {
    super(loggingMessage);

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializedError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
