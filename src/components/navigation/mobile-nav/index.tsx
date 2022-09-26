import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { IoReorderFour } from '@react-icons/all-files/io5/IoReorderFour';
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

interface MobileNavProps {
  user?: Dancer;
  events?: Array<GameEvent>;
  loading: boolean;
}

const MobileNav = (props: MobileNavProps) => {
  const [, setLocation] = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerBtnRef = React.useRef<HTMLButtonElement>(null);
  const loggedIn = !!props.user;

  return (
    <>
      <NavBarContainer>
        <IconButton
          itemRef="drawer-ref"
          ref={drawerBtnRef}
          onClick={onOpen}
          icon={<IoReorderFour />}
          aria-label={'Open Drawer'}
        />
        <Image
          src={logo}
          w="80px"
          onClick={() => setLocation('/')}
          cursor="pointer"
          pr="10px"
        />
        <Flex w="100px" pl="10px" pr="10px">
          <PCColorModeSwitch />
          <Menu>
            <Profile isLoaded={!props.loading}>
              {!loggedIn && !props.loading && (
                <LoggedOutProfile
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
              )}
              {!!props.user && (
                <LoggedInProfile
                  user={props.user}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                />
              )}
            </Profile>
            <MenuList itemRef="user-dropdown">
              <UserMenuGroup user={props.user} />
            </MenuList>
          </Menu>
        </Flex>
      </NavBarContainer>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={drawerBtnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
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
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={onClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNav;
export { MobileNavProps };
