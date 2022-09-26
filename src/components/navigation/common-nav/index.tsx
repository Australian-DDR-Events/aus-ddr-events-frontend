import {
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  SkeletonCircle,
} from '@chakra-ui/react';
import React from 'react';
import { Dancer } from 'services/dancers';
import { GetLoginUrl, GetLogoutUrl } from 'utils/account';
import { getProfileImageUrl } from 'utils/assets';

import { NavBarProfilePictureIcon } from './styled';

interface DropdownMenuItem {
  display?: string;
  action?: () => void;
}

export const MenuItems = ({
  menuOptions,
}: {
  menuOptions: DropdownMenuItem[];
}) => {
  return (
    <>
      {menuOptions.map((value, index) =>
        value.display ? (
          <MenuItem key={index} onClick={value.action}>
            {value.display}
          </MenuItem>
        ) : (
          <MenuDivider key={index} />
        ),
      )}
    </>
  );
};

const Profile = ({
  isLoaded,
  children,
}: {
  isLoaded: boolean;
  children: (false | React.ReactElement)[];
}) => (
  <MenuButton>
    <SkeletonCircle
      itemRef="user-dropdown"
      fadeDuration={1}
      size={'3em'}
      isLoaded={isLoaded}
    >
      {children}
    </SkeletonCircle>
  </MenuButton>
);

const LoggedOutProfile = ({ onClick }: { onClick: () => void }) => (
  <NavBarProfilePictureIcon onClick={() => onClick()} />
);

const LoggedInProfile = ({
  user,
  onClick,
}: {
  user: Dancer;
  onClick: () => void;
}) => (
  <NavBarProfilePictureIcon
    name={user.name}
    src={
      user.profilePictureUrl
        ? getProfileImageUrl(user.profilePictureUrl)
        : undefined
    }
    onClick={() => onClick()}
    {...(user.profilePictureUrl && {
      bgColor: 'transparent',
    })}
  />
);

const UserMenuGroup = ({ user }: { user?: Dancer }) => {
  if (!user)
    return (
      <MenuGroup title="Guest">
        <MenuItems
          menuOptions={[
            {
              display: 'Login',
              action: () => window.location.assign(GetLoginUrl()),
            },
          ]}
        />
      </MenuGroup>
    );
  return (
    <MenuGroup title={user.name}>
      <MenuItems
        menuOptions={[
          {
            display: 'Profile',
            action: () => window.location.assign('/profile'),
          },
          {},
          {
            display: 'Logout',
            action: () => window.location.assign(GetLogoutUrl()),
          },
        ]}
      />
    </MenuGroup>
  );
};

export { LoggedInProfile, LoggedOutProfile, Profile, UserMenuGroup };
