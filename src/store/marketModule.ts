import { ICoin } from "@/types/Market.interface";
import { IMarketState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { MarketWebService, Logger } from "@/container";

export const marketModule: Module<IMarketState, IState> = {
  namespaced: true,
  state: (): IMarketState => ({
    coins: [],
    coins_found: [],
    isLoading: false,
  }),
  getters: {},
  mutations: {
    addCoin(state: IMarketState, coin: ICoin): void {
      state.coins.push(coin);
    },
    setFoundCoins(state: IMarketState, coins: ICoin[]): void {
      state.coins_found.length = 0;
      state.coins_found.push(...coins);
    },
    // addBlockUnify(state: IBlockState, block: IBlock | IBlock[]): void {
    //   if (Array.isArray(block)) {
    //     let err = "";
    //     block.forEach((blk) => {
    //       if (state.blocks.find((b) => b.height === blk.height)) err = err + blk.height + ", ";
    //       else state.blocks.push(blk);
    //     });
    //     if (err) throw Error("Blocks already exists: " + err.slice(0, -2));
    //   } else if (state.blocks.find((b) => b.height === block.height)) throw Error("Block already exists: " + block.height);
    //   else state.blocks.push(block);
    // },
    setLoading(state: IMarketState, isLoading: boolean): void {
      state.isLoading = isLoading;
    },
  },
  actions: {
    // async fetchNextBlock({ state, commit, rootState }): Promise<void> {
    //   commit("setLoading", true);
    //   try {
    //     if (!rootState.status.blockchainStatus) throw Error("blockchainStatus is null");
    //     const hash: string = state.blocks.length ? state.blocks[state.blocks.length - 1].prev_block : rootState.status.blockchainStatus.hash;
    //     const block: IBlock | IBlock[] = await BlockWebService.fetchBlockByCode(hash);
    //     commit("addBlockUnify", block);
    //   } catch (error) {
    //     Logger.log(`[fetchNextBlock]: ${error}`);
    //     throw error;
    //   } finally {
    //     commit("setLoading", false);
    //   }
    // },

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
