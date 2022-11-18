import { IStatus } from "@/types/Block.interface";
import { IStatusState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { BlockWebService, Logger } from "@/container";
import Base from "@/store/baseState";

const base = new Base();

export const statusModule: Module<IStatusState, IState> = {
  namespaced: true,
  state: (): IStatusState => ({
    ...base.state,
    blockchainStatus: null,
  }),
  getters: {},
  mutations: {
    ...base.mutations,
    setStatus(state: IStatusState, status: IStatus): void {
      state.blockchainStatus = status;
    },
  },
  actions: {
    async fetchBlockchainStatus({ commit }): Promise<void> {
      commit("setLoading", true);
      try {
        commit("setStatus", await BlockWebService.fetchMainBlock());
      } catch (error) {
        Logger.log(`[fetchBlockchainStatus]: ${error}`);
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
