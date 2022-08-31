import { shallowMount, flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";
import axios from "axios";
import store from "@/store";
import BlockchainState from "@/components/BlockchainStatus.vue";
import { IStatusState } from "@/types/State.interface";

const actions = {
  fetchBlockchainStatus: jest.fn(),
};
const mockStore = createStore({
  modules: {
    status: {
      namespaced: true,
      state: (): IStatusState => ({
        blockchainStatus: {
          name: "title",
          height: 123,
          unconfirmed_count: 500,
          hash: "hashcode",
        },
        isBlockchainStatusLoading: false,
      }),
      actions,
    },
  },
});

describe("unit test for BlockchainState component", () => {
  it("should initialize correctly with real store", async () => {
    const renderedState = "Loading...";
    const wrapper = shallowMount(BlockchainState, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.find("div").text()).toEqual(renderedState);
  });

  it("should initialize correctly with real store and mock axios", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: { name: "BTC.main.test" } });
    const renderedName = "Name: BTC.main.test";
    const wrapper = shallowMount(BlockchainState, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.isVisible()).toBeTruthy();
    await flushPromises();
    expect(wrapper.find(".block > div").text()).toEqual(renderedName);
  });

  it("should initialize correctly with mock store", () => {
    const renderedName = "<div><b>Name:</b> title</div>";
    const wrapper = shallowMount(BlockchainState, {
      global: {
        plugins: [mockStore],
      },
    });
    expect(wrapper.isVisible()).toBeTruthy();
    expect(wrapper.find(".block > div").html()).toEqual(renderedName);
    //console.log("[html]:", wrapper.html());
  });
});
