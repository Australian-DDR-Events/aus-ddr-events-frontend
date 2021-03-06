import React, { useContext, useEffect, useState } from 'react';
import { BadgesRepositoryContext } from 'context/badges';
import { Dancer } from 'context/dancer';
import { Badge } from 'context/badges/types';
import { Box, Center, SimpleGrid, Image, Text } from '@chakra-ui/react';
import { defaultSpacing } from 'types/styled-components';

const BadgeComponent = ({
  badge,
  eventName,
}: {
  badge: Badge;
  eventName: string;
}) => (
  <>
    <Box w="fit-content" textAlign="center">
      <Center>
        <Image src={`${process.env.ASSETS_URL}${badge.image128}`} />
      </Center>
      <Text fontWeight="bold">{eventName}</Text>
      <Text>{badge.name}</Text>
    </Box>
  </>
);

const BadgesTab = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [loading, setLoading] = useState(true);

  const gridWidth = badges.length > 5 ? 5 : badges.length;

  useEffect(() => {
    if (loading && dancer.id) {
      badgesRepo.badgesRepositoryInstance
        .getById(dancer.id)
        .then((badgeResult) => {
          setBadges(badgeResult.okOrDefault());
          setLoading(false);
        });
    }
  }, []);

  return (
    <SimpleGrid
      minChildWidth="128px"
      spacing={defaultSpacing / 2}
      maxW={defaultSpacing * 18 * gridWidth}
    >
      {badges.map((b) => (
        <Center key={b.id}>
          <BadgeComponent badge={b} eventName={b.event.name} />
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default BadgesTab;
