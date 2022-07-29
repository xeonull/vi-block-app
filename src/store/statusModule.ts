import { IStatus } from "@/types/Blocks.interface";
import { IStatusState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { fetchMainBlock } from "@/utils/web";

export const statusModule: Module<IStatusState, IState> = {
  namespaced: true,
  state: (): IStatusState => ({
    blockchainStatus: null,
    isBlockchainStateLoaded: false,
  }),
  getters: {},
  mutations: {
    setStatus(state: IStatusState, status: IStatus): void {
      state.blockchainStatus = status;
    },
    setLoading(state: IStatusState, isLoading: boolean): void {
      state.isBlockchainStateLoaded = isLoading;
    },
  },
  actions: {
    async fetchBlockchainStatus({ commit }): Promise<void> {
      commit("setLoading", false);
      try {
        commit("setStatus", await fetchMainBlock());
      } catch (error) {
        console.log("[[Store:blockModule Error - onNextBlock]]:", error);
      } finally {
        commit("setLoading", true);
      }
    },
  },
};
