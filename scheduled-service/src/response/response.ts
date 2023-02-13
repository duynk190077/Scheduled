export class ResponseDto {
  status: number;
  code: number;
  error?: string;
  data: any;

  constructor(status: number, code: number, data: any, error: string = null) {
    this.status = status;
    this.code = code;
    this.error = error;
    this.data = data;
  }
}
