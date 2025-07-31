import { StatusCodes } from "http-status-codes";

class DomainException implements Error {
  public errorReason: StatusCodes;
  public message: string;
  public name: string;
  constructor(message: string, errorReason: StatusCodes) {
    this.message = message;
    this.errorReason = errorReason;
    this.name = "";
  }
}
export default DomainException;
