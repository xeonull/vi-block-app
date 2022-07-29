import { IBlock, IStatus } from "@/types/Blocks.interface";

export interface IState {
  block: IBlockState;
  status: IStatusState;
}

export interface IBlockState {
  blocks: Array<IBlock>;
  isNextBlockLoading: boolean;
}

export interface IStatusState {
  blockchainStatus: IStatus | null;
  isBlockchainStateLoaded: boolean;
}
