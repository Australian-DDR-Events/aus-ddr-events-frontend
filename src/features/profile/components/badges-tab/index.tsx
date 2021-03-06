import React, { useContext, useEffect, useState } from 'react';
import { BadgesRepositoryContext } from 'context/badges';
import { Dancer } from 'context/dancer';
import { Badge } from 'context/badges/types';
import { EventsRepositoryContext } from 'context/events';
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
  const eventsRepo = useContext(EventsRepositoryContext);

  const [badges, setBadges] = useState(new Array<Badge>());
  const [eventNames, setEventNames] = useState(new Map<string, string>());
  const [loading, setLoading] = useState(true);

  const gridWidth = badges.length > 5 ? 5 : badges.length;

  useEffect(() => {
    if (loading && dancer.id) {
      Promise.all([
        badgesRepo.badgesRepositoryInstance.getById(dancer.id),
        eventsRepo.eventsRepositoryInstance.getAll(false),
      ]).then(([badgeResult, eventResult]) => {
        setBadges(badgeResult.okOrDefault());
        setEventNames(
          new Map(eventResult.okOrDefault().map((e) => [e.id, e.name])),
        );
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
          <BadgeComponent
            badge={b}
            eventName={eventNames.get(b.eventId) || ''}
          />
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default BadgesTab;
