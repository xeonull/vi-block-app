import { IAddress } from "@/types/Address.interface";
import { IAddressState, IState } from "@/types/State.interface";
import { Module } from "vuex";
import { AddressWebService, Logger } from "@/container";
import Base from "@/store/baseState";

const base = new Base();

export const addressModule: Module<IAddressState, IState> = {
  namespaced: true,
  state: (): IAddressState => ({
    ...base.state,
    addresses: [],
  }),
  getters: {},
  mutations: {
    ...base.mutations,
    setAddresses(state: IAddressState, addresses: Array<IAddress>): void {
      state.addresses = addresses;
    },
    addAddress(state: IAddressState, address: IAddress | IAddress[]): void {
      if (Array.isArray(address)) {
        let err = "";
        address.forEach((addr) => {
          if (state.addresses.find((b) => b.address === addr.address)) err = err + addr.address + ", ";
          else state.addresses.push(addr);
        });
        if (err) throw Error("Address already exists: " + err.slice(0, -2));
      } else if (state.addresses.find((b) => b.address === address.address)) throw Error("Address already exists: " + address.address);
      else state.addresses.push(address);
    },
  },
  actions: {
    async fetchAddressBalance({ commit }, addr: string): Promise<void> {
      commit("setLoading", true);
      try {
        const result: IAddress | IAddress[] = await AddressWebService.fetchAddressData(addr);
        commit("addAddress", result);
      } catch (error) {
        Logger.log(`[fetchAddressBalance]: ${error}`);
        throw error;
      } finally {
        commit("setLoading", false);
      }
    },
  },
};
