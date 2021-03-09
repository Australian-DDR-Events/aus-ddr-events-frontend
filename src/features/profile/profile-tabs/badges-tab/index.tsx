import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { BadgesRepositoryContext } from 'context/badges';
import { Badge } from 'context/badges/types';
import { Dancer } from 'context/dancer';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled';

import BadgeAllocationModal from './badge-allocation-modal';
import BadgeDisplay from './badge-display';

const BadgesTab = ({ dancer }: { dancer: Dancer }) => {
  const badgesRepo = useContext(BadgesRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);

  const [dancerBadges, setDancerBadges] = useState(new Array<Badge>());
  const [badges, setBadges] = useState(new Array<Badge>());
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const gridWidth = dancerBadges.length > 5 ? 5 : dancerBadges.length;

  useEffect(() => {
    if (loading && dancer.id) {
      badgesRepo.badgesRepositoryInstance
        .getForDancerId(dancer.id)
        .then((badgeResult) => {
          setDancerBadges(badgeResult.okOrDefault());
          setLoading(false);
        });
    }
    authRepo.authenticationRepositoryInstance
      .getClaim('admin')
      .then((result) => {
        if (result.isOk() && result.okOrDefault()) {
          setIsAdmin(true);
          badgesRepo.badgesRepositoryInstance
            .getAll()
            .then((badgeResult) => setBadges(badgeResult.okOrDefault()));
        }
      });
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
    <>
      {isAdmin && (
        <>
          <Alert status="error">
            <AlertIcon />
            <Box flex="1" textAlign="left">
              <AlertTitle mr={2}>This is admin only functionality!</AlertTitle>
              <AlertDescription>Please proceed with caution.</AlertDescription>
            </Box>
          </Alert>
          <Button
            onClick={() => setIsOpen(true)}
            p={defaultSpacing / 4}
            colorScheme="red"
            mt={defaultSpacing / 4}
            mb={defaultSpacing / 4}
          >
            Badge allocation
          </Button>
          <BadgeAllocationModal
            dancerId={dancer.id}
            badges={badges}
            dancerBadges={dancerBadges}
            setDancerBadges={setDancerBadges}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
      <SimpleGrid
        minChildWidth="128px"
        spacing={defaultSpacing / 2}
        maxW={defaultSpacing * 18 * gridWidth}
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
