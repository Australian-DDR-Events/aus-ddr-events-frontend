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
import React, { useEffect, useState } from 'react';
import { Badge } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';

import {
  BadgeAllocationModelFieldsFragment,
  useAssignBadgeForDancerMutation,
  useGetBadgesQuery,
  useRevokeBadgeForDancerMutation,
} from './operation.generated';

const BadgeAllocationModal = ({
  dancerId,
  dancerBadges,
  setDancerBadges,
  isOpen,
  onClose,
}: {
  dancerId: string;
  dancerBadges: Array<Badge>;
  setDancerBadges: Function;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [badges, setBadges] = useState(new Array<Badge>());
  const [isLoading, setIsLoading] = useState(true);

  const [badgesResult] = useGetBadgesQuery();

  const [, assignBadges] = useAssignBadgeForDancerMutation();
  const [, revokeBadges] = useRevokeBadgeForDancerMutation();

  useEffect(() => {
    if (!isOpen || !badgesResult || badgesResult.fetching || !badgesResult.data)
      return;
    setBadges(
      badgesResult.data.badges.nodes.map(
        (badge: BadgeAllocationModelFieldsFragment) => ({ ...badge }),
      ),
    );
    setIsLoading(false);
  }, [badgesResult, isOpen]);

  const onAssignBadge = (badge: Badge) => {
    assignBadges({
      dancerId,
      badgeId: badge.id,
    });
    setDancerBadges(new Array<Badge>(...dancerBadges, badge));
  };

  const onRevokeBadge = (badge: Badge) => {
    revokeBadges({
      dancerId,
      badgeId: badge.id,
    });
    setDancerBadges(dancerBadges.filter((db) => db.id !== badge.id));
  };

  const revokableBadge = (badge: Badge) => {
    return (
      <Center key={`${badge.id}`}>
        <Image src={getAssetUrl(badge.image64)} />
        <Button onClick={() => onRevokeBadge(badge)} size="sm">
          Revoke
        </Button>
      </Center>
    );
  };

  const assignableBadge = (badge: Badge) => {
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
        {isLoading ? (
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
