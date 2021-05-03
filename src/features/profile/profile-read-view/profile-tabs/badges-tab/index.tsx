import { Button, Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import AdminWrapper from 'components/admin-wrapper';
import React, { useEffect, useState } from 'react';
import {
  BadgeFieldsFragment,
  useGetAllBadgesForDancerQuery,
} from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';

import BadgeAllocationModal from './badge-allocation-modal';
import BadgeDisplay from './badge-display';

const BadgesTab = ({ dancerId }: { dancerId: string }) => {
  const [isBadgeAllocationModalOpen, setIsBadgeAllocationModalOpen] = useState(
    false,
  );

  const [badges, setBadges] = useState<BadgeFieldsFragment[]>([]);
  const [
    { data, fetching },
    reexecuteGetAllBadges,
  ] = useGetAllBadgesForDancerQuery({
    variables: {
      dancerId,
    },
  });

  useEffect(() => {
    if (data?.dancerById) {
      setBadges(data.dancerById.badges);
    }
  }, [fetching]);

  const onBadgeAllocationModalClosed = () => {
    setIsBadgeAllocationModalOpen(false);
    reexecuteGetAllBadges();
  };

  if (fetching) {
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
            dancerId={dancerId}
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
            <BadgeDisplay badge={b} eventName={b.event?.name || ''} />
          </Center>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BadgesTab;
