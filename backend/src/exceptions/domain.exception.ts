import { StatusCodes } from "http-status-codes";

class DomainException extends Error {
  public errorReason: StatusCodes;
  constructor(message: string, errorReason: StatusCodes) {
    super(message);
    this.errorReason = errorReason;
  }
}
export default DomainException;
