export type TStatus = {
  name: string;
  height: number;
  unconfirmed_count: number;
  hash: string;
};

export type TBlock = {
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
