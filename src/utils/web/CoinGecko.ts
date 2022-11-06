import axios, { AxiosError } from "axios";
import { ICrypto, ICoin } from "@/types/Market.interface";
import { IMarketWebService } from "@/types/Service.interface";
import { injectable } from "tsyringe";

@injectable()
export class CoinGeckoWebService implements IMarketWebService {
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

  async fetchMarketData(cryptoCurrency: string, vsCurrency: string): Promise<ICoin[]> {
    const data: ICoin[] = await this.makeGetRequest(
      `https://api.coingecko.com/api/v3/coins/markets?ids=${cryptoCurrency}&vs_currency=${vsCurrency}&per_page=250&page=1&sparkline=false`
    );
    data.forEach((c) => {
      c.thumb = c.image?.replace("/large/", "/thumb/");
    });
    return data;
  }

  async fetchSearch(searchString: string): Promise<ICoin[]> {
    const data: ICrypto = await this.makeGetRequest(`https://api.coingecko.com/api/v3/search?query=${searchString}`);
    return data.coins; //data.coins.filter((t) => t.market_cap_rank != null);
  }
}
