import { shallowMount } from "@vue/test-utils";
import BlockchainState from "./../src/components/BlockchainState.vue";

describe("BlockchainState.vue", () => {
  it("renders props.msg when passed", () => {
    const status = {};
    const wrapper = shallowMount(BlockchainState, {
      props: { status },
    });
    expect(wrapper.text()).toEqual(status);
  });
});
