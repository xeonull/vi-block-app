export interface ICrypto {
  coins: ICoin[];
}

export interface IMarket {
  price: number;
  market_cap: number;
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
  market?: IMarket[];
}
