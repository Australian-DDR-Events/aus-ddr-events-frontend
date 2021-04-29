import {
  Button,
  Center,
  Divider,
  Heading,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  BadgeAllocationModelFieldsFragment,
  BadgeFieldsFragment,
  useAssignBadgeForDancerMutation,
  useGetBadgesQuery,
  useRevokeBadgeForDancerMutation,
} from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';

const BadgeAllocationModal = ({
  dancerId,
  dancerBadges,
  setDancerBadges,
  isOpen,
  onClose,
}: {
  dancerId: string;
  dancerBadges: Array<BadgeFieldsFragment>;
  setDancerBadges: Function;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [badges, setBadges] = useState(
    new Array<BadgeAllocationModelFieldsFragment>(),
  );

  const [{ data, fetching }] = useGetBadgesQuery();

  const [, assignBadges] = useAssignBadgeForDancerMutation();
  const [, revokeBadges] = useRevokeBadgeForDancerMutation();

  if (data?.badges?.nodes) {
    setBadges(data.badges.nodes);
  }

  const onAssignBadge = (badge: BadgeAllocationModelFieldsFragment) => {
    assignBadges({
      dancerId,
      badgeId: badge.id,
    });
    setDancerBadges(
      new Array<BadgeAllocationModelFieldsFragment>(...dancerBadges, badge),
    );
  };

  const onRevokeBadge = (badge: BadgeFieldsFragment) => {
    revokeBadges({
      dancerId,
      badgeId: badge.id,
    });
    setDancerBadges(dancerBadges.filter((db) => db.id !== badge.id));
  };

  const revokableBadge = (badge: BadgeFieldsFragment) => {
    return (
      <Center key={`${badge.id}`}>
        <Image src={getAssetUrl(badge.image64)} />
        <Button onClick={() => onRevokeBadge(badge)} size="sm">
          Revoke
        </Button>
      </Center>
    );
  };

  const assignableBadge = (badge: BadgeAllocationModelFieldsFragment) => {
    return (
      <Center key={`${badge.id}`}>
        <Image src={getAssetUrl(badge.image64)} />
        <Button onClick={() => onAssignBadge(badge)}>Assign</Button>
      </Center>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        {fetching ? (
          <Center>
            <Spinner size="lg" />
          </Center>
        ) : (
          <>
            <Heading size="md">Revoke badges</Heading>
            <SimpleGrid
              minChildWidth="128px"
              spacing={4}
              maxW={defaultPixel * 18 * 8}
            >
              {dancerBadges.map((badge) => revokableBadge(badge))}
            </SimpleGrid>
            <Divider mt={4} mb={4} />
            <Heading size="md">Assign badges</Heading>
            <SimpleGrid
              minChildWidth="128px"
              spacing={4}
              maxW={defaultPixel * 18 * 8}
            >
              {badges
                .filter((b) => !dancerBadges.some((db) => db.id === b.id))
                .map((badge) => assignableBadge(badge))}
            </SimpleGrid>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BadgeAllocationModal;
