export interface Stock {
  id: number,
  companyName: string,
  symbol: string,
};

export interface StockRequest {
  id?: number,
  companyName: string,
  symbol: string,
};

export interface TenDay {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,
};