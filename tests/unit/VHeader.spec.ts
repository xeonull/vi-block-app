import { mount, VueWrapper } from "@vue/test-utils";
import VHeader from "@/components/VHeader.vue";
describe("unit test for VHeader component", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {

    wrapper = mount(VHeader, {
      global: {
        config: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith("v-"),
          },
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should initialize correctly", async () => {
    expect(wrapper.isVisible()).toBeTruthy();
  });

  it("should emit 'on-search' when click button with no-empty input text", async () => {
    wrapper.getComponent(VHeader).vm.input_text = "12345678";
    //await wrapper.vm.$nextTick();
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeTruthy();
  });

  it("should no emit 'on-search' when click button with empty input text", async () => {
    wrapper.getComponent(VHeader).vm.input_text = "";
    //await wrapper.vm.$nextTick();
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeFalsy();
  });

  it("should no emit 'on-search' when click button with only-spaces input text", async () => {
    wrapper.getComponent(VHeader).vm.input_text = "   ";
    //await wrapper.vm.$nextTick();
    wrapper.find(".btn__search").trigger("click");
    expect(wrapper.emitted("on-search")).toBeFalsy();
  });
});
