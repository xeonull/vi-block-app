import { IBlock, IStatus } from "@/types/Blocks.interface";
import { ICoin } from "@/types/Market.interface";

export interface ILogger {
  log(message: string): void;
}

export interface IToast {
  show(message: string): void;
}

export interface IBlockWebService {
  /* Return current state of blockchain */
  fetchMainBlock(): Promise<IStatus>;
  /* Return block by hash or number */
  fetchBlockByCode(hash: string | number): Promise<IBlock | IBlock[]>;
}

export interface IMarketWebService {
  /* Return current price, market cap, volume and other market data */
  fetchMarketData(cryptoCurrency: string, vsCurrency: string): Promise<ICoin[]>;
  /* Return coins by search string */
  fetchSearch(searchString: string): Promise<ICoin[]>;
}
