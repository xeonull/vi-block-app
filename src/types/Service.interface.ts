import { IBlock, IStatus } from "./Blocks.interface";

export interface IWebService {
  /* Return current state of blockchain */
  fetchMainBlock(): Promise<IStatus>;
  /* Return block by hash or number */
  fetchBlockByCode(hash: string | number): Promise<IBlock | IBlock[]>;
}

export interface ILogger {
  log(message: string): void;
}

export interface IToast {
  show(message: string): void;
}

// export interface ICoinService {}
