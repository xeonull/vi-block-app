import { createStore } from "vuex";
import { blockModule, IBlockState } from "./blockModule";

export interface IState {
  block: IBlockState;
}

export default createStore({
  // state: () => ({
  //   likes: 8,
  // }),
  // getters: {
  //   xTen(state) {
  //     return state.likes * 10;
  //   },
  // },
  // mutations: {
  //   incLikes(state) {
  //     state.likes++;
  //   },
  //   decLikes(state) {
  //     state.likes--;
  //   },
  // },
  modules: {
    block: blockModule,
  },
});
