import { Story, Meta } from '@storybook/react/types-6-0';
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart';
import Button, { ButtonProps } from '.';

export default {
  title: 'Button',
  component: Button,
  args: {
    children: 'Buy now'
  },
  argTypes: {
    children: {
      type: 'string'
    },
    icon: {
      type: ''
    }
  }
} as Meta;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

export const withIcon: Story<ButtonProps> = (args) => <Button {...args} />;

withIcon.args = {
  size: 'small',
  children: 'Buy now',
  icon: <AddShoppingCart />
};

export const asLink: Story<ButtonProps> = (args) => <Button {...args} />;

asLink.args = {
  size: 'large',
  children: 'Buy now',
  as: 'a',
  href: '/link'
};
