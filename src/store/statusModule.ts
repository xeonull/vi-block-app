import { IStatus } from "@/types/Blocks.interface";
import { IStatusState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { WebService } from "@/container";

export const statusModule: Module<IStatusState, IState> = {
  namespaced: true,
  state: (): IStatusState => ({
    blockchainStatus: null,
    isBlockchainStatusLoading: false,
  }),
  getters: {},
  mutations: {
    setStatus(state: IStatusState, status: IStatus): void {
      state.blockchainStatus = status;
    },
    setLoading(state: IStatusState, isLoading: boolean): void {
      state.isBlockchainStatusLoading = isLoading;
    },
  },
  actions: {
    async fetchBlockchainStatus({ commit }): Promise<void> {
      commit("setLoading", true);
      try {
        commit("setStatus", await WebService.fetchMainBlock());
      } catch (error) {
        console.log("[[Store:blockModule Error - onNextBlock]]:", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
