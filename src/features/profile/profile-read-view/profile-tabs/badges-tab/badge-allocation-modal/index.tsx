import React from 'react';

const BadgeAllocationModal = ({
  dancerId,
  dancerBadges,
  isOpen,
  onClose,
}: {
  dancerId: string;
  dancerBadges: Array<any>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  onClose();
  return (
    <>
      {dancerId}
      {dancerBadges}
      {isOpen}
    </>
  );
  // const [badges, setBadges] = useState<any[]>([]);
  // const [assignedBadges, setAssginedBadges] = useState(dancerBadges);

  // useEffect(() => {
  //   if (!fetching) {
  //     if (data?.badges?.nodes) {
  //       setBadges(badges.concat(data.badges.nodes));
  //     }
  //     if (data?.badges?.pageInfo.hasNextPage) {
  //       setQueryVariables({
  //         ...queryVariables,
  //         page: data.badges.pageInfo.endCursor,
  //       });
  //     }
  //   }
  // }, [fetching]);

  // const onAssignBadge = (badge: BadgeFieldsFragment) => {
  //   assignBadges({
  //     dancerId,
  //     badgeId: badge.id,
  //   });
  //   assignedBadges.push(badge);
  // };

  // const onRevokeBadge = (badge: BadgeFieldsFragment) => {
  //   revokeBadges({
  //     dancerId,
  //     badgeId: badge.id,
  //   });
  //   setAssginedBadges(assignedBadges.filter((b) => b.id !== badge.id));
  // };

  // const assignableBadge = (badge: BadgeFieldsFragment) => {
  //   return (
  //     <Center key={`${badge.id}`}>
  //       <Image src={getAssetUrl(badge.image64)} />
  //       <Button onClick={() => onAssignBadge(badge)}>Assign</Button>
  //     </Center>
  //   );
  // };

  // const revokableBadge = (badge: BadgeFieldsFragment) => {
  //   return (
  //     <Center key={`${badge.id}`}>
  //       <Image src={getAssetUrl(badge.image64)} />
  //       <Button onClick={() => onRevokeBadge(badge)} size="sm">
  //         Revoke
  //       </Button>
  //     </Center>
  //   );
  // };

  // return (
  //   <Modal isOpen={isOpen} onClose={onClose} size="lg">
  //     <ModalOverlay />
  //     <ModalContent p={4}>
  //       <ModalCloseButton />
  //       {fetching ? (
  //         <Center>
  //           <Spinner size="lg" />
  //         </Center>
  //       ) : (
  //         <>
  //           <Heading size="md">Revoke badges</Heading>
  //           <SimpleGrid
  //             minChildWidth="128px"
  //             spacing={4}
  //             maxW={defaultPixel * 18 * 8}
  //           >
  //             {assignedBadges.map((badge) => revokableBadge(badge))}
  //           </SimpleGrid>
  //           <Divider mt={4} mb={4} />
  //           <Heading size="md">Assign badges</Heading>
  //           <SimpleGrid
  //             minChildWidth="128px"
  //             spacing={4}
  //             maxW={defaultPixel * 18 * 8}
  //           >
  //             {badges
  //               .filter((b) => !assignedBadges.some((db) => db.id === b.id))
  //               .map((badge) => assignableBadge(badge))}
  //           </SimpleGrid>
  //         </>
  //       )}
  //     </ModalContent>
  //   </Modal>
  // );
};

export default BadgeAllocationModal;
