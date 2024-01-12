import { CustomError } from './custom-error-abstract';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor(protected loggingMessage?: string) {
    super(loggingMessage);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializedError(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.loggingMessage || 'User Not Authorized',
      },
    ];
  }
}
