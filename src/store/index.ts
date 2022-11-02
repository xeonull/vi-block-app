import { createStore } from "vuex";
import { blockModule } from "@/store/blockModule";
import { statusModule } from "@/store/statusModule";
import { marketModule } from "@/store/marketModule";

export default createStore({
  modules: {
    block: blockModule,
    status: statusModule,
    market: marketModule,
  },
});
