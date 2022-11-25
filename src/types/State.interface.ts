import { IBlock, IStatus } from "@/types/Block.interface";
import { IAddress } from "@/types/Address.interface";
import { ICoin } from "@/types/Market.interface";

export interface IState {
  block: IBlockState;
  status: IStatusState;
  market: IMarketState;
  address: IAddressState;
}

export interface IBaseState {
  isLoading: boolean;
}

export interface IStatusState extends IBaseState {
  blockchainStatus: IStatus | null;
}

export interface IBlockState extends IBaseState {
  blocks: Array<IBlock>;
}

export interface IMarketState extends IBaseState {
  coins: Array<ICoin>;
  coinsFound: Array<ICoin>;
  vsCurrency: string;
  currencyList: Array<string>;
  isSearching: boolean;
}

export interface IAddressState extends IBaseState {
  addresses: Array<IAddress>;
}
