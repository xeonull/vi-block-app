import { mount, flushPromises, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import store from "@/store";
import BlockchainState from "@/components/BlockchainStatus.vue";
import { WebService } from "@/container";

describe("unit test for BlockchainState component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    vi.spyOn(WebService, "fetchMainBlock").mockResolvedValue({ name: "BTC.main.test", height: 123, unconfirmed_count: 321, hash: "hash_code" });
    wrapper = mount(BlockchainState, {
      global: {
        plugins: [store],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should initialize correctly with real Store and mock WebService", async () => {
    expect(wrapper.isVisible()).toBeTruthy();
    //console.log("[html]:", wrapper.html());
  });

  it("should display a 'Loading' message", async () => {
    const renderedName = "Loading...";
    store.dispatch("status/fetchBlockchainStatus");
    await wrapper.vm.$nextTick();
    expect(wrapper.find("div").text()).toEqual(renderedName);
  });

  it("should display a correct 'Name' field", async () => {
    const renderedName = "Name: BTC.main.test";
    await flushPromises();
    expect(wrapper.find(".block > .block__name").text()).toEqual(renderedName);
  });

  it("should display a correct 'Height' field", async () => {
    const renderedHeight = "The number of blocks in the blockchain: 123";
    await flushPromises();
    expect(wrapper.find(".block > .block__height").text()).toEqual(renderedHeight);
  });

  it("should display a correct 'Hash' field", async () => {
    const renderedHash = "Hash: hash_code";
    await flushPromises();
    expect(wrapper.find(".block > .block__hash").text()).toEqual(renderedHash);
  });

  it("should display a correct 'Unconfirmed count' field", async () => {
    const renderedCount = "Number of unconfirmed transactions in memory pool: 321";
    await flushPromises();
    expect(wrapper.find(".block > .block__ucount").text()).toEqual(renderedCount);
  });
});
