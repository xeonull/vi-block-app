import { IBlock, IStatus } from "./Blocks.interface";

export interface IWebService {
  /* Return current state of blockchain */
  fetchMainBlock(): Promise<IStatus>;
  /* Return block by hash or number */
  fetchBlockByCode(hash: string | number): Promise<IBlock>;
}

export interface ILogger {
  log(message: string): void;
}
