import { createStore } from "vuex";
import { blockModule } from "@/store/blockModule";
import { statusModule } from "@/store/statusModule";

export default createStore({
  modules: {
    block: blockModule,
    status: statusModule,
  },
});
