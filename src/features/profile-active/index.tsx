import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

const ProfileActive = () => {
  // const fetching = true;
  // const [{ data, fetching }] = useGetDancerByAuthIdQuery({
  //   variables: {
  //     authId: loggedInUser.id,
  //   },
  // });

  return (
    <Box w="70vw">
      <SkeletonCircle size="20" mb={4} />
      <Skeleton height={4} mb={2} />
      <Skeleton height={4} mb={2} />
      <Skeleton height={4} />
    </Box>
  );

  // if (!data?.dancerByAuthId) {
  //   return (
  //     <Container maxW="sm" mb={8}>
  //       <Alert status="error" borderRadius="md" mb={4}>
  //         <Box flex="1">
  //           <AlertTitle mr={2}>
  //             Uh oh! We can&apos;t load your profile.
  //           </AlertTitle>
  //           <AlertDescription>
  //             Let the developers know and we&apos;ll sort you out.
  //           </AlertDescription>
  //         </Box>
  //       </Alert>
  //     </Container>
  //   );
  // }

  // return <Profile id={data?.dancerByAuthId?.id || ''} isEditable />;
};

export default ProfileActive;
