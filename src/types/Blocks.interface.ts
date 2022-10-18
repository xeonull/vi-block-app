export interface IStatus {
  name: string;
  height: number;
  unconfirmed_count: number;
  hash: string;
}

export interface IBlock {
  chain: string;
  prev_block: string;
  height: number;
  hash: string;
  total: number;
  fees: number;
  nonce: number;
  received_time: Date;
  size: number;
  vsize: number;
  ver: number;
  relayed_by: string;
  coinbase_addr: string;
  bits: number;
  mrkl_root: string;
  depth: number;
  n_tx: number;
  txids: Array<string>;
  tx_url: string;
  next_txids: string;
}
