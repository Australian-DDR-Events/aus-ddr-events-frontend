import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'wouter';

import { GetEvents } from './service';

const EventsMenuItem = () => {
  const { data } = GetEvents();
  const [, setLocation] = useLocation();
  const now = new Date();

  return (
    <Menu>
      <MenuButton as={Button}>Events</MenuButton>
      <MenuList>
        <MenuGroup title="Current Events">
          {data &&
            data
              .filter(
                (event) =>
                  new Date(event.startDate) <= now &&
                  new Date(event.endDate) >= now,
              )
              .map((event) => (
                <MenuItem
                  key={event.eventId}
                  onClick={() => setLocation(`/events/${event.eventId}`)}
                >
                  {event.name}
                </MenuItem>
              ))}
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Past Events">
          {data &&
            data
              .filter((event) => new Date(event.endDate) <= now)
              .map((event) => (
                <MenuItem
                  key={event.eventId}
                  onClick={() => setLocation(`/events/${event.eventId}`)}
                >
                  {event.name}
                </MenuItem>
              ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default EventsMenuItem;
