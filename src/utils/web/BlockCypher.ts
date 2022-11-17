import axios, { AxiosError } from "axios";
import { IStatus, IBlock } from "@/types/Block.interface";
import { IAddress } from "@/types/Address.interface";
import { IAddressWebService, IBlockWebService } from "@/types/Service.interface";
import { injectable } from "tsyringe";

@injectable()
export class BlockCypherWebService implements IBlockWebService, IAddressWebService {
  async makeGetRequest<T>(request: string, params?: URLSearchParams): Promise<T> {
    try {
      const response = await axios.get(request, { params });
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

  async fetchAddressData(address: string): Promise<IAddress> {
    return await this.makeGetRequest(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`);
  }

  async fetchAddressDataWithTxs(address: string, limit?: number | undefined, before?: number | undefined, after?: number | undefined): Promise<IAddress> {
    const params: URLSearchParams = new URLSearchParams();
    limit && params.append("limit", limit.toString());
    before && params.append("before", before.toString());
    after && params.append("after", after.toString());
    return await this.makeGetRequest(`https://api.blockcypher.com/v1/btc/main/addrs/${address}/full`, params);
  }
}
