import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import VHeader from "@/components/VHeader.vue";

describe("unit test for VHeader component", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(VHeader);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should initialize correctly", async () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("should emit 'on-search' when click button with no-empty input text", async () => {
    wrapper.vm.input_text = "12345678";
    //await wrapper.vm.$nextTick();
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeTruthy();
  });

  it("should no emit 'on-search' when click button with empty input text", async () => {
    wrapper.vm.input_text = "";
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeFalsy();
  });

  it("should no emit 'on-search' when click button with only-spaces input text", async () => {
    wrapper.vm.input_text = "   ";
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeFalsy();
  });
});
