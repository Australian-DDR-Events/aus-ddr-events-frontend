import { Avatar, Button, Center, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';
import { getProfileImageUrl } from 'utils/assets';

import { NavigationDancerFieldsFragment } from '../operation.generated';

const ProfileMenuItem = ({
  isMobileView,
  dancer,
  onProfileMenuItemClick,
}: {
  isMobileView: boolean;
  dancer: NavigationDancerFieldsFragment;
  onProfileMenuItemClick: () => void;
}) =>
  isMobileView ? (
    <Center mr={4}>
      <Avatar
        size="sm"
        name={dancer.ddrName}
        src={getProfileImageUrl(dancer.profilePictureUrl)}
        display={{ lg: 'none' }}
        showBorder
        borderColor="blue.500"
        borderWidth={2}
        mr={2}
        onClick={onProfileMenuItemClick}
        {...(getProfileImageUrl(dancer.profilePictureUrl) && {
          bgColor: 'transparent',
        })}
      />
      <Button
        colorScheme="blue"
        variant="link"
        onClick={onProfileMenuItemClick}
        display={{ lg: 'none' }}
        fontSize="xl"
      >
        My profile
      </Button>
    </Center>
  ) : (
    <>
      {!dancer.id && (
        <SkeletonCircle mr={4} display={{ base: 'none', lg: 'inline-block' }} />
      )}
      {dancer.id && (
        <>
          <Avatar
            size="md"
            name={dancer.ddrName}
            src={getProfileImageUrl(dancer.profilePictureUrl)}
            display={{ base: 'none', lg: 'inline-block' }}
            showBorder
            borderColor="blue.500"
            borderWidth={2}
            onClick={onProfileMenuItemClick}
            cursor="pointer"
            {...(getProfileImageUrl(dancer.profilePictureUrl) && {
              bgColor: 'transparent',
            })}
          />
          <Button
            colorScheme="blue"
            variant="link"
            onClick={onProfileMenuItemClick}
            mr={2}
            isLoading={!dancer.id}
            display={{ base: 'none', lg: 'inline-block' }}
          >
            My profile
          </Button>
        </>
      )}
    </>
  );

export default ProfileMenuItem;
