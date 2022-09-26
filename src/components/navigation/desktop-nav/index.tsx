import { Flex, Image, Menu, MenuList } from '@chakra-ui/react';
import logo from 'assets/logo.png';
import React from 'react';
import { Dancer } from 'services/dancers';
import { GameEvent } from 'services/events/types';
import { useLocation } from 'wouter';

import {
  LoggedInProfile,
  LoggedOutProfile,
  Profile,
  UserMenuGroup,
} from '../common-nav';
import { HeaderButton, NavBarContainer, PCColorModeSwitch } from './styled';

interface DesktopNavProps {
  user?: Dancer;
  events?: Array<GameEvent>;
  loading: boolean;
}

const DesktopNav = (props: DesktopNavProps) => {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const loggedIn = !!props.user;

  return (
    <NavBarContainer>
      <Image
        src={logo}
        w="80px"
        onClick={() => setLocation('/')}
        cursor="pointer"
        pr="10px"
      />
      <Flex flex="1">
        {props.events
          ?.filter(
            (e) =>
              new Date(e.startDate) <= new Date() &&
              new Date(e.endDate) >= new Date(),
          )
          .map((e) => (
            <HeaderButton
              key={e.eventId}
              content={e.name}
              action={() => setLocation(`/events/${e.eventId}`)}
            />
          ))}
      </Flex>
      <Flex w="100px" pl="10px" pr="10px">
        <PCColorModeSwitch />
        <Menu>
          <Profile isLoaded={!props.loading}>
            {!loggedIn && !props.loading && (
              <LoggedOutProfile onClick={() => setIsOpen(!isOpen)} />
            )}
            {!!props.user && (
              <LoggedInProfile
                user={props.user}
                onClick={() => setIsOpen(!isOpen)}
              />
            )}
          </Profile>
          <MenuList itemRef="user-dropdown">
            <UserMenuGroup user={props.user} />
          </MenuList>
        </Menu>
      </Flex>
    </NavBarContainer>
  );
};

export default DesktopNav;
export { DesktopNavProps };
