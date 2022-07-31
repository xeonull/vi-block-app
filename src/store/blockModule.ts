import { IBlock } from "@/types/Blocks.interface";
import { IBlockState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { fetchBlockByCode } from "@/utils/web";

export const blockModule: Module<IBlockState, IState> = {
  namespaced: true,
  state: (): IBlockState => ({
    blocks: [],
    isBlockLoading: false,
  }),
  getters: {},
  mutations: {
    setBlocks(state: IBlockState, blocks: Array<IBlock>): void {
      state.blocks = blocks;
    },
    addBlock(state: IBlockState, block: IBlock): void {
      state.blocks.push(block);
    },
    setLoading(state: IBlockState, isLoading: boolean): void {
      state.isBlockLoading = isLoading;
    },
  },
  actions: {
    async fetchNextBlock({ state, commit, rootState }): Promise<void> {
      commit("setLoading", true);
      try {
        if (!rootState.status.blockchainStatus) throw Error("blockchainStatus is null");
        const hash: string = state.blocks.length ? state.blocks[state.blocks.length - 1].prev_block : rootState.status.blockchainStatus.hash;
        const block: IBlock = await fetchBlockByCode(hash);
        commit("addBlock", block);
      } catch (error) {
        console.log("[Store:blockModule:fetchNextBlock Error]:", error);
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchSearchBlock({ commit }, text: string): Promise<void> {
      commit("setLoading", true);
      try {
        const block: IBlock = await fetchBlockByCode(text);
        commit("addBlock", block);
      } catch (error: unknown) {
        console.log("[Store:blockModule:fetchSearchBlock Error]:", error);
        throw new Error(String(error));
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
