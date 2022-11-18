import { IBaseState } from "@/types/State.interface";

export default class {
  state: { isLoading: boolean };
  mutations: { setLoading(state: IBaseState, isLoading: boolean): void };

  constructor() {
    this.state = {
      isLoading: false,
    };

    this.mutations = {
      setLoading(state: IBaseState, isLoading: boolean): void {
        state.isLoading = isLoading;
      },
    };
  }
}
