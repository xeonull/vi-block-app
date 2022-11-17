import { IBlock, IStatus } from "@/types/Block.interface";
import { ICoin } from "@/types/Market.interface";
import { IAddress } from "@/types/Address.interface";

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

export interface IAddressWebService {
  /* Return general information about the address, including its balance and the number of transactions associated with it. */
  fetchAddressData(address: string): Promise<IAddress>;
  /* Return all information available about a particular address, including an array of complete transactions instead of just transaction inputs and outputs */
  fetchAddressDataWithTxs(address: string, limit?: number, before?: number, after?: number): Promise<IAddress>;
}
