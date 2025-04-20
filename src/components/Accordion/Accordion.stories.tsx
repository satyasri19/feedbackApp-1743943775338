import React from 'react';
import { Meta, Story } from '@storybook/react';
import Accordion, { AccordionProps } from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    allowMultipleOpen: { control: 'boolean' },
  },
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'item1', title: 'Accordion Item 1', content: 'Content for item 1' },
    { id: 'item2', title: 'Accordion Item 2', content: 'Content for item 2' },
    { id: 'item3', title: 'Accordion Item 3', content: 'Content for item 3', disabled: true },
  ],
  allowMultipleOpen: false,
};

export const MultipleOpen = Template.bind({});
MultipleOpen.args = {
  ...Default.args,
  allowMultipleOpen: true,
};