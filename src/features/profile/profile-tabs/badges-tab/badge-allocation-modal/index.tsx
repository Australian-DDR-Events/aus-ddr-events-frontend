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
} from '@chakra-ui/react';
import { BadgesRepositoryContext } from 'context/badges';
import { Badge } from 'context/badges/types';
import React, { useContext } from 'react';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';

const BadgeAllocationModal = ({
  dancerId,
  badges,
  dancerBadges,
  setDancerBadges,
  isOpen,
  onClose,
}: {
  dancerId: string;
  badges: Array<Badge>;
  dancerBadges: Array<Badge>;
  setDancerBadges: Function;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const badgeRepo = useContext(BadgesRepositoryContext);

  const onAssignBadge = (badge: Badge) => {
    badgeRepo.badgesRepositoryInstance.assignBadge(dancerId, badge.id);
    setDancerBadges(new Array<Badge>(...dancerBadges, badge));
  };

  const onRevokeBadge = (badge: Badge) => {
    badgeRepo.badgesRepositoryInstance.revokeBadge(dancerId, badge.id);
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
      </ModalContent>
    </Modal>
  );
};

export default BadgeAllocationModal;
