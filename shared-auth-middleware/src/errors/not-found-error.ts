import { CustomError } from './custom-error-abstract';

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor(public loggingMessage?: string) {
    super(loggingMessage);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializedError(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'Page Not Found',
      },
    ];
  }
}
