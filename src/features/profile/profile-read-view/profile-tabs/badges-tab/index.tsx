import { Button, Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import AdminWrapper from 'components/admin-wrapper';
import React, { useState } from 'react';
import { defaultPixel } from 'types/styled';

import BadgeAllocationModal from './badge-allocation-modal';
import BadgeDisplay from './badge-display';
import { GetBadgesForDancerById } from './service';

const BadgesTab = ({ id }: { id: string }) => {
  const { data: badges, loading, refetch } = GetBadgesForDancerById(id);
  const [isBadgeAllocationModalOpen, setIsBadgeAllocationModalOpen] =
    useState(false);

  const onBadgeAllocationModalClosed = () => {
    setIsBadgeAllocationModalOpen(false);
    refetch!();
  };

  if (loading) {
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
  }

  if (!badges) {
    return <p>Something went wrong...</p>;
  }

  const gridWidth = badges.length > 5 ? 5 : badges.length;

  return (
    <>
      <AdminWrapper>
        <Button
          onClick={() => setIsBadgeAllocationModalOpen(true)}
          p={2}
          colorScheme="red"
          mt={2}
          mb={2}
        >
          Badge allocation
        </Button>
        {isBadgeAllocationModalOpen && (
          <BadgeAllocationModal
            dancerId={id}
            dancerBadges={badges}
            isOpen={isBadgeAllocationModalOpen}
            onClose={onBadgeAllocationModalClosed}
          />
        )}
      </AdminWrapper>
      <SimpleGrid
        minChildWidth="128px"
        spacing={4}
        maxW={defaultPixel * 18 * gridWidth}
      >
        {badges.map((b) => (
          <Center key={b.id}>
            <BadgeDisplay badge={b} />
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BadgesTab;
