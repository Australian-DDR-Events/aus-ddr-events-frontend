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
import { defaultPixel } from 'types/styled';
import { badgeIdToAsset } from 'utils/assets';

import { AssignBadge, GetBadges, RevokeBadge } from './service';
import { BadgeResponse } from './types';

const BadgeAllocationModal = ({
  dancerId,
  dancerBadges,
  isOpen,
  onClose,
}: {
  dancerId: string;
  dancerBadges: Array<BadgeResponse>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: badges, loading: badgesLoading } = GetBadges();
  const [assignedBadges, setAssignedBadges] = useState(dancerBadges);

  const onAssignBadge = (badge: BadgeResponse) => {
    AssignBadge(dancerId, badge.id);
    setAssignedBadges([badge, ...assignedBadges]);
  };

  const onRevokeBadge = (badge: BadgeResponse) => {
    RevokeBadge(dancerId, badge.id);
    setAssignedBadges(assignedBadges.filter((b) => b.id !== badge.id));
  };

  const assignableBadge = (badge: BadgeResponse) => {
    return (
      <Center key={`${badge.id}`}>
        <Image src={badgeIdToAsset(badge.id, 64)} />
        <Button onClick={() => onAssignBadge(badge)} size="sm">
          Assign
        </Button>
      </Center>
    );
  };

  const revokableBadge = (badge: BadgeResponse) => {
    return (
      <Center key={`${badge.id}`}>
        <Image src={badgeIdToAsset(badge.id, 64)} />
        <Button onClick={() => onRevokeBadge(badge)} size="sm">
          Revoke
        </Button>
      </Center>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        {!badges || badgesLoading ? (
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
              {assignedBadges.map((badge) => revokableBadge(badge))}
            </SimpleGrid>
            <Divider mt={4} mb={4} />
            <Heading size="md">Assign badges</Heading>
            <SimpleGrid
              minChildWidth="128px"
              spacing={4}
              maxW={defaultPixel * 18 * 8}
            >
              {badges
                .filter((b) => !assignedBadges.some((db) => db.id === b.id))
                .map((badge) => assignableBadge(badge))}
            </SimpleGrid>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BadgeAllocationModal;
