// explanation for the use of setPrototypeOf in all custom constructor:
// https://github.com/microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work

type ExtendedErrorConstructor = {
  message?: string;
  params?: object;
  cause?: Error;
};

type GeneralErrorConstructor = {
  message?: string;
  params?: object;
  cause?: Error;
};

type NotFoundErrorConstructor = {
  message: string;
  params?: object;
};

type ValidationErrorConstructor = {
  message: string;
};

export class ExtendedError extends Error {
  params: object;
  code: number;
  isTrusted: boolean;

  constructor({ message, params, cause }: ExtendedErrorConstructor) {
    super(message, cause);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.message = cause?.message || this.message;
    this.params = params || {};
    this.code = 500;
    this.isTrusted = false;
    this.stack = cause?.stack || this.stack;
  }

  fullError() {
    return `${this.stack}\n\nparams: ${JSON.stringify(this.params, null, 2)}`;
  }
}

export class GeneralError extends ExtendedError {
  constructor({ message, params, cause }: GeneralErrorConstructor) {
    super({ message, params, cause });

    this.code = 500;
    this.isTrusted = false;
  }
}

export class NotFoundError extends ExtendedError {
  constructor({ message, params }: NotFoundErrorConstructor) {
    super({ message, params });

    this.code = 404;
    this.isTrusted = true;
  }
}

export class ValidationError extends ExtendedError {
  constructor({ message }: ValidationErrorConstructor) {
    super({ message });

    this.code = 422;
    this.isTrusted = true;
  }

  fullError() {
    return `${this.stack}`;
  }
}
