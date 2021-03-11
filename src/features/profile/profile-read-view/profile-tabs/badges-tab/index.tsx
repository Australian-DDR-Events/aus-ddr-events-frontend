import { Button, Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import AdminWrapper from 'components/admin-wrapper';
import { Badge } from 'context/badges/types';
import React, { useState } from 'react';
import { defaultPixel } from 'types/styled';

import BadgeAllocationModal from './badge-allocation-modal';
import BadgeDisplay from './badge-display';

const BadgesTab = ({
  dancerId,
  dancerBadges,
  isLoading,
  onDancerBadgesChanged,
}: {
  dancerId: string;
  dancerBadges: Badge[];
  isLoading: boolean;
  onDancerBadgesChanged: (badges: Badge[]) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const gridWidth = dancerBadges.length > 5 ? 5 : dancerBadges.length;

  if (isLoading)
    return (
      <Center>
        <Spinner // todo: replace this with proper skeleton structure
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <>
      <AdminWrapper>
        <Button
          onClick={() => setIsOpen(true)}
          p={2}
          colorScheme="red"
          mt={2}
          mb={2}
        >
          Badge allocation
        </Button>
        <BadgeAllocationModal
          dancerId={dancerId}
          dancerBadges={dancerBadges}
          setDancerBadges={onDancerBadgesChanged}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </AdminWrapper>
      <SimpleGrid
        minChildWidth="128px"
        spacing={4}
        maxW={defaultPixel * 18 * gridWidth}
      >
        {dancerBadges.map((b) => (
          <Center key={b.id}>
            <BadgeDisplay badge={b} eventName={b.event?.name || ''} />
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BadgesTab;
