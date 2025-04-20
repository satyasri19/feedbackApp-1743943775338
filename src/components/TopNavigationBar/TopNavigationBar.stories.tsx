import React from 'react';
import { Meta, Story } from '@storybook/react';
import TopNavigationBar, { TopNavigationBarProps } from './TopNavigationBar';

export default {
  title: 'Components/TopNavigationBar',
  component: TopNavigationBar,
} as Meta;

const Template: Story<TopNavigationBarProps> = (args) => <TopNavigationBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'profile', label: 'Profile', href: '#profile' },
    { id: 'settings', label: 'Settings', href: '#settings', disabled: true },
  ],
  selectedId: 'home',
};
