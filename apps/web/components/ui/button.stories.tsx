import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Botão Principal",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Botão Secundário",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Botão Borda",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Efeito Fantasma",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Botão Pequeno",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Botão Grande",
  },
};
