import { IBlock, IStatus } from "@/types/Blocks.interface";
import { ICoin } from "@/types/Market.interface";

export interface IState {
  block: IBlockState;
  status: IStatusState;
  market: IMarketState;
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
  coins_found: Array<ICoin>;
  isLoading: boolean;
}
