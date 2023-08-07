import type { Meta, StoryObj } from "@storybook/vue3";

import VButton from "@/components/ui/VButton.vue";

const meta: Meta<typeof VButton> = {
  title: "UI/V-Button",
  component: VButton,
  tags: ["autodocs"],
  argTypes: {
    // border: { control: 'select', options: ['small', 'medium', 'large'] },
    // border: { control:  options: ['small', 'medium', 'large'] },
    backgroundColor: { control: "color" },
    onClick: { action: "clicked" },
  },
  args: { isBorder: true }, // default value
};

export default meta;
type Story = StoryObj<typeof VButton>;

const baseStory: Story = {
  render: (args) => ({
    components: { VButton },
    setup() {
      return { args };
    },
    template: '<VButton style>{{ args.label }}</VButton>',
  }),
};

export const Primary: Story = {
  ...baseStory,
  args: {
    label: "My Button",
  },
};

export const Secondary: Story = {
  ...baseStory,
  args: {
    isBorder: false,
    label: "My Button without border",
  },
};

export const Disabled: Story = {
  ...baseStory,
  args: {
    label: "My disabled Button",
    isDisabled: true,
  },
};

export const Big: Story = {
  ...baseStory,
  args: {
    label: "Big Button",
    size: "big",
  },
};
