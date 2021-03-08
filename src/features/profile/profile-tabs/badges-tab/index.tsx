import { Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import { BadgesRepositoryContext } from 'context/badges';
import { Badge } from 'context/badges/types';
import { Dancer } from 'context/dancer';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled';

import BadgeDisplay from './badge-display';

const BadgesTab = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [loading, setLoading] = useState(true);

  const gridWidth = badges.length > 5 ? 5 : badges.length;

  useEffect(() => {
    if (loading && dancer.id) {
      badgesRepo.badgesRepositoryInstance
        .getForDancerId(dancer.id)
        .then((badgeResult) => {
          setBadges(badgeResult.okOrDefault());
          setLoading(false);
        });
    }
  }, []);

  if (loading)
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
    <SimpleGrid
      minChildWidth="128px"
      spacing={defaultSpacing / 2}
      maxW={defaultSpacing * 18 * gridWidth}
    >
      {badges.map((b) => (
        <Center key={b.id}>
          <BadgeDisplay badge={b} eventName={b.event?.name || ''} />
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default BadgesTab;
