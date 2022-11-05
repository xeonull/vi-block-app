import { ICoin } from "@/types/Market.interface";
import { IMarketState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { MarketWebService, Logger } from "@/container";

export const marketModule: Module<IMarketState, IState> = {
  namespaced: true,
  state: (): IMarketState => ({
    coins: [],
    coinsFound: [],
    isLoading: false,
    vsCurrency: localStorage.getItem("vsCurrency") || "usd",
  }),
  getters: {},
  mutations: {
    addCoin(state: IMarketState, coin: ICoin): void {
      if (!state.coins.find((c) => c.id === coin.id)) state.coins.push(coin);
    },
    setCoins(state: IMarketState, coins: ICoin[]): void {
      state.coins.length = 0;
      state.coins.push(...coins);
    },
    loadCoinsFromLocalStorage(state: IMarketState) {
      state.coins = JSON.parse(localStorage.getItem("coins") || "[]");
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
    setLoading(state: IMarketState, isLoading: boolean): void {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchMarketData({ state, commit }): Promise<void> {
      commit("setLoading", true);
      try {
        const ids: string = state.coins.reduce((a, c) => `${a},${c.id}`, "");
        if (!ids) return;
        const coins: ICoin[] = await MarketWebService.fetchMarketData(ids, state.vsCurrency);
        commit("setCoins", coins);
      } catch (error) {
        Logger.log(`[fetchMarketData]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchSearchCoins({ commit }, text: string): Promise<void> {
      commit("setLoading", true);
      try {
        const coins: ICoin[] = await MarketWebService.fetchSearch(text);
        commit("setFoundCoins", coins);
      } catch (error: unknown) {
        Logger.log(`[fetchSearchCoins]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
