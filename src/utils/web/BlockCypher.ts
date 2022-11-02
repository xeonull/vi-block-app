import axios, { AxiosError } from "axios";
import { IStatus, IBlock } from "@/types/Blocks.interface";
import { IBlockWebService } from "@/types/Service.interface";
import { injectable } from "tsyringe";

@injectable()
export class BlockCypherWebService implements IBlockWebService {
  async makeGetRequest<T>(request: string): Promise<T> {
    try {
      const response = await axios.get(request);
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError)
        switch (e.response?.status) {
          case 429:
            throw new Error("429: Too many requests");
          default:
            throw new Error(e.response?.data.error);
        }
      else throw e;
    }
  }

  async fetchMainBlock(): Promise<IStatus> {
    return await this.makeGetRequest(`https://api.blockcypher.com/v1/btc/main`);
  }

  async fetchBlockByCode(hash: string | number): Promise<IBlock> {
    return await this.makeGetRequest(`https://api.blockcypher.com/v1/btc/main/blocks/${hash}`);
  }
}
