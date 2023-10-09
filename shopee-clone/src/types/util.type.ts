export interface SuccessResponseApi<Data> {
  message: string;
  data: Data;
}

export interface ErrorResponseApi<Data> {
  message: string;
  data?: Data;
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%';
