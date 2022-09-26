import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import MobileNav, { MobileNavProps } from '.';

export default {
  title: 'Components/Navigation/Mobile-Nav',
  component: MobileNav,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MobileNav>;

const Template: ComponentStory<typeof MobileNav> = (args: MobileNavProps) => (
  <MobileNav {...args} />
);

const events = [
  {
    eventId: 'cd3b68a4-4c09-4c5d-a821-27bb92a5a0d9',
    name: 'Always Running',
    description: '',
    startDate: '2020-09-26T09:19:02.919Z',
    endDate: '2042-09-26T09:19:02.919Z',
  },
];

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: undefined,
  loading: false,
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loading: false,
  user: {
    id: 'user-id',
    name: 'Bob',
    code: 'DDR-Code-123',
    primaryLocation: 'Crown',
    state: 'Vic',
    profilePictureUrl: undefined,
    userRoles: [],
  },
  events: events,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};
