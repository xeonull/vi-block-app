export interface IStatus {
  name: string;
  height: number;
  unconfirmed_count: number;
  hash: string;
};

export interface IBlock {
  prev_block: string;
  height: number;
  hash: string;
  total: number;
  fees: number;
  nonce: number;
  n_tx: number;
  received_time: Date;
  txids: Array<string>;
};
