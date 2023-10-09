export interface SuccessResponseApi<Data> {
  message: string;
  data: Data;
}

export interface ErrorResponseApi<Data> {
  message: string;
  data?: Data;
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase();
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%';
