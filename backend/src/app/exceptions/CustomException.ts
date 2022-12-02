export class CustomException extends Error {
  code: number;

  constructor(message: string, code: number = 400) {
    super(message);

    this.code = code;
    this.name = this.constructor.name;
  }
}
