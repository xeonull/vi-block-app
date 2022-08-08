import axios, { AxiosError } from "axios";
import { IStatus, IBlock } from "@/types/Blocks.interface";
import { IWebService } from "@/types/Service.interface";
import { injectable } from "tsyringe";

@injectable()
export class BlockCypherWebService implements IWebService {
  async makeGetRequest<T>(request: string): Promise<T> {
    try {
      const response = await axios.get(request);
      return response.data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) throw Error(e.response?.data.error);
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
