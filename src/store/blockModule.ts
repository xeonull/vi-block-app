import { IBlock } from "@/types/Block.interface";
import { IBlockState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { BlockWebService, Logger } from "@/container";
import Base from "@/store/baseState";

const base = new Base();

export const blockModule: Module<IBlockState, IState> = {
  namespaced: true,
  state: (): IBlockState => ({
    ...base.state,
    blocks: [],
  }),
  getters: {},
  mutations: {
    ...base.mutations,
    setBlocks(state: IBlockState, blocks: Array<IBlock>): void {
      state.blocks = blocks;
    },
    addBlock(state: IBlockState, block: IBlock): void {
      if (state.blocks.find((b) => b.height === block.height)) throw Error("Block already exists: " + block.height);
      else state.blocks.push(block);
    },
    addBlockUnify(state: IBlockState, block: IBlock | IBlock[]): void {
      if (Array.isArray(block)) {
        let err = "";
        block.forEach((blk) => {
          if (state.blocks.find((b) => b.height === blk.height)) err = err + blk.height + ", ";
          else state.blocks.push(blk);
        });
        if (err) throw Error("Blocks already exists: " + err.slice(0, -2));
      } else if (state.blocks.find((b) => b.height === block.height)) throw Error("Block already exists: " + block.height);
      else state.blocks.push(block);
    },
  },
  actions: {
    async fetchNextBlock({ state, commit, rootState }): Promise<void> {
      if (!state.isLoading) {
        commit("setLoading", true);
        try {
          if (!rootState.status.blockchainStatus) throw Error("blockchainStatus is null");
          const hash: string = state.blocks.length ? state.blocks[state.blocks.length - 1].prev_block : rootState.status.blockchainStatus.hash;
          const block: IBlock | IBlock[] = await BlockWebService.fetchBlockByCode(hash);
          commit("addBlockUnify", block);
        } catch (error) {
          Logger.log(`[fetchNextBlock]: ${error}`);
          throw error;
        } finally {
          commit("setLoading", false);
        }
      }
    },

    async fetchSearchBlock({ commit }, text: string): Promise<void> {
      commit("setLoading", true);
      try {
        const block: IBlock | IBlock[] = await BlockWebService.fetchBlockByCode(text);
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
