import { Button, Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import AdminWrapper from 'components/admin-wrapper';
import { Badge } from 'context/badges/types';
import React, { useEffect, useState } from 'react';
import { defaultPixel } from 'types/styled';

import BadgeAllocationModal from './badge-allocation-modal';
import BadgeDisplay from './badge-display';
import {
  BadgeFieldsFragment,
  useGetAllBadgesForDancerQuery,
} from './operation.generated';

const BadgesTab = ({
  dancerId,
  badges,
  setBadges,
}: {
  dancerId: string;
  badges: Badge[];
  setBadges: Function;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result] = useGetAllBadgesForDancerQuery({
    variables: {
      dancerId,
    },
  });

  useEffect(() => {
    if (!result || result.fetching || !result.data) return;
    setBadges(
      result.data.dancerById.badges.map((badge: BadgeFieldsFragment) => ({
        ...badge,
      })),
    );
    setIsLoading(false);
  }, [result]);

  const [isOpen, setIsOpen] = useState(false);

  const gridWidth = badges.length > 5 ? 5 : badges.length;

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
          dancerBadges={badges}
          setDancerBadges={setBadges}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
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
