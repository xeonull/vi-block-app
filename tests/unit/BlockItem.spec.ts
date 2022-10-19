import { mount, flushPromises, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import store from "@/store";
import BlockItem from "@/components/BlockItem.vue";
import VDateTimeFormat from "@/directives/VDateTimeFormat";
import VHashCode from "@/directives/VHashCode";

describe("unit test for BlockItem component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(BlockItem, {
      props: {
        block: {
          hash: "000000000000000000003e14615ba4388e99b0518a65707a14edd2f804588041",
          height: 751554,
          received_time: new Date("2022-08-28T13:21:28.671Z"),
          nonce: 3162806412,
          n_tx: 821,
          total: 126389498671,
          prev_block: "000000000000000000085fc50f17e8a621088b83172fd9f1124a0c59205f117f",
          fees: 1905673,
          txids: [],
        },
      },
      global: {
        plugins: [store],
        directives: {
          datetimeformat: VDateTimeFormat,
          hashcode: VHashCode,
        },
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

  it("should display a correct title", async () => {
    const renderedField = "Block #751554";
    await flushPromises();
    expect(wrapper.find(".block > router-link > .block__title").text()).toEqual(renderedField);
  });

  it("should display a correct 'Hash' field", async () => {
    const renderedField = "Hash: 00000000...04588041";
    await flushPromises();
    expect(wrapper.find(".block > .block__hash").text()).toEqual(renderedField);
  });

  it("should display a correct 'Total' field", async () => {
    const renderedField = "Total: 1263.89498671 BTC";
    await flushPromises();
    expect(wrapper.find(".block > .block__total").text()).toEqual(renderedField);
  });

  it("should display a correct 'Fees' field", async () => {
    const renderedField = "Fees: 0.01905673 BTC";
    await flushPromises();
    expect(wrapper.find(".block > .block__fees").text()).toEqual(renderedField);
  });

  it("should display a correct 'Number of transactions' field", async () => {
    const renderedField = "Number of transactions: 821";
    await flushPromises();
    expect(wrapper.find(".block > .block__n_tx").text()).toEqual(renderedField);
  });

  it("should display a correct 'Received time' field", async () => {
    const renderedField = "Received time: 28.08.2022, 16:21:28";
    await flushPromises();
    expect(wrapper.find(".block > .block__time").text()).toEqual(renderedField);
  });
});
