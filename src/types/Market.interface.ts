export interface ICrypto {
  coins: ICoin[];
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank?: number;
  thumb?: string;
  large?: string;
  current_price?: number;
  market_cap?: number;
  circulating_supply?: number;
  total_supply?: number;
}
