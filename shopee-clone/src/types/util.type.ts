export interface SuccessResponseApi<Data> {
  message: string;
  data: Data;
}

export interface ErrorResponseApi<Data> {
  message: string;
  data?: Data;
}
