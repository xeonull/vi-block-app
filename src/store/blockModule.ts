import { IBlock } from "@/types/Blocks.interface";
import { Module } from "vuex";
import { IState } from ".";

export interface IBlockState {
  blocks: Array<IBlock>;
  isNextBlockLoading: boolean;
}

export const blockModule: Module<IBlockState, IState> = {
  namespaced: true,
  state: (): IBlockState => ({
    blocks: [],
    isNextBlockLoading: false,
  }),
  getters: {},
  mutations: {
    setBlocks: function (state: IBlockState, blocks: Array<IBlock>): void {
      state.blocks = blocks;
    },
  },
  actions: {
    //async fetchBlock() {},
  },
};
