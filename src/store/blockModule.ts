import { IBlock } from "@/types/Blocks.interface";
import { IBlockState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { WebService, Logger } from "@/container";

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
    addBlockUnify(state: IBlockState, block: IBlock | IBlock[]): void {
      if (Array.isArray(block))
        block.forEach((b) => {
          state.blocks.push(b);
        });
      else state.blocks.push(block);
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
        const block: IBlock | IBlock[] = await WebService.fetchBlockByCode(hash);
        commit("addBlockUnify", block);
      } catch (error) {
        Logger.log(`[fetchNextBlock]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },

    async fetchSearchBlock({ commit }, text: string): Promise<void> {
      commit("setLoading", true);
      try {
        const block: IBlock | IBlock[] = await WebService.fetchBlockByCode(text);
        commit("addBlockUnify", block);
      } catch (error: unknown) {
        Logger.log(`[fetchSearchBlock]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
