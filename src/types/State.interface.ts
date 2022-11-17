import { IBlock, IStatus } from "@/types/Block.interface";
import { IAddress } from "@/types/Address.interface";
import { ICoin } from "@/types/Market.interface";

export interface IState {
  block: IBlockState;
  status: IStatusState;
  market: IMarketState;
  address: IAddressState;
}

export interface IStatusState {
  blockchainStatus: IStatus | null;
  isBlockchainStatusLoading: boolean;
}

export interface IBlockState {
  blocks: Array<IBlock>;
  isBlockLoading: boolean;
}

export interface IMarketState {
  coins: Array<ICoin>;
  coinsFound: Array<ICoin>;
  isLoading: boolean;
  vsCurrency: string;
  currencyList: Array<string>;
}

export interface IAddressState {
  addresses: Array<IAddress>;
  isLoading: boolean;
}
