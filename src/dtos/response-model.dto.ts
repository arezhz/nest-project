export class ResponseModel {
  result: any;
  success: boolean;
  errorCode: null | number;

  constructor(res: any) {
    this.result = res;
    this.success = true;
    this.errorCode = null;
  }
}
