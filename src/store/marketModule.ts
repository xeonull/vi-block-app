import { ICoin, ICoinSort } from "@/types/Market.interface";
import { IMarketState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { MarketWebService, Logger } from "@/container";
import Base from "@/store/baseState";

const base = new Base();

export const marketModule: Module<IMarketState, IState> = {
  namespaced: true,
  state: (): IMarketState => ({
    ...base.state,
    isSearching: false,
    coins: [],
    coinsFound: [],
    vsCurrency: localStorage.getItem("vsCurrency") || "usd",
    currencyList: ["usd", "eur", "rub", "uah", "btc", "eth"],
  }),
  getters: {},
  mutations: {
    ...base.mutations,
    setSearching(state: IMarketState, isSearching: boolean): void {
      state.isSearching = isSearching;
    },
    setCurrency(state: IMarketState, currency: string): void {
      state.vsCurrency = currency;
      localStorage.setItem("vsCurrency", state.vsCurrency);
    },
    addCoin(state: IMarketState, coin: ICoin): void {
      if (!state.coins.find((c) => c.id === coin.id)) state.coins.push(coin);
      else throw Error("Coin already exists");
    },
    removeCoin(state: IMarketState, coin: ICoin): void {
      const i = state.coins.findIndex((c) => c.id === coin.id);
      if (i > -1) state.coins.splice(i, 1);
      else throw Error(`Coin ${coin.id} not found`);
    },
    sortCoins(state: IMarketState, cs: ICoinSort): void {
      const asc = cs.ascending ? 1 : -1;
      if (cs) {
        const defVal = cs.field == "market_cap_rank" ? Infinity : 0;
        state.coins.sort((a, b) => {
          // const x: Exclude<ICoin[keyof ICoin], undefined> = a[cs.field] || 0;
          // const y: Exclude<ICoin[keyof ICoin], undefined> = b[cs.field] || 0;
          // return x > y ? asc : -asc;
          return (a[cs.field] || defVal) > (b[cs.field] || defVal) ? asc : -asc;
        });
      }
    },
    setCoins(state: IMarketState, coins: ICoin[]): void {
      state.coins.length = 0;
      state.coins.push(...coins);
    },
    updateCoins(state: IMarketState, coins: ICoin[]): void {
      state.coins.forEach((c) => {
        const actual_coin = coins.find((ac) => c.id == ac.id);
        Object.assign(c, actual_coin);
      });
    },
    loadCoinsFromLocalStorage(state: IMarketState) {
      state.coins.length = 0;
      state.coins.push(...JSON.parse(localStorage.getItem("coins") || "[]"));
    },
    saveCoinsToLocalStorage(state: IMarketState) {
      const coins: ICoin[] = state.coins.map((c) => {
        return { id: c.id, name: c.name, symbol: c.symbol };
      });
      localStorage.setItem("coins", JSON.stringify(coins));
      localStorage.setItem("vsCurrency", state.vsCurrency);
    },
    setFoundCoins(state: IMarketState, coins: ICoin[]): void {
      state.coinsFound.length = 0;
      state.coinsFound.push(...coins);
    },
  },
  actions: {
    async addCoin({ commit }, coin: ICoin): Promise<void> {
      try {
        commit("addCoin", coin);
      } catch (error) {
        Logger.log(`[addCoin]: ${error}`);
        throw error;
      }
    },

    async fetchMarketData({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const ids: string = state.coins.reduce((a, c) => `${a},${c.id}`, "");
        if (!ids) return;
        const coins: ICoin[] = await MarketWebService.fetchMarketData(ids, state.vsCurrency);
        commit("updateCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketData]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataTOP({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency);
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataTOP]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataNFT({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "non-fungible-tokens-nft");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataNFT]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataDEFI({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "decentralized-finance-defi");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataDEFI]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataDEX({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "decentralized-exchange");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataDEX]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataCEX({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "centralized-exchange-token-cex");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataCEX]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataFAN({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "fan-token");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataFAN]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchMarketDataGAME({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchMarketData("", state.vsCurrency, "gaming");
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketDataGAME]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchSearchCoins({ commit }, text: string): Promise<void> {
      commit("setSearching", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchSearch(text);
        commit("setFoundCoins", coins);
      } catch (error: unknown) {
        Logger.log(`[fetchSearchCoins]: ${error}`);
        throw error;
      } finally {
        commit("setSearching", false);
      }
    },
  },
};
