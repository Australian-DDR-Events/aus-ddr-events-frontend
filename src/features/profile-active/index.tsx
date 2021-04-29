import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import Profile from 'features/profile';
import React, { useContext, useEffect, useState } from 'react';
import { useGetDancerByAuthIdQuery } from 'types/graphql.generated';

const ProfileActive = () => {
  const authRepo = useContext(AuthenticationRepositoryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [dancerId, setDancerId] = useState('');

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();
  const authId = loggedInUser.id;

  const [activeDancerResult] = useGetDancerByAuthIdQuery({
    variables: {
      authId,
    },
  });

  useEffect(() => {
    if (
      !activeDancerResult ||
      activeDancerResult.fetching ||
      !activeDancerResult.data
    )
      return;
    setDancerId(activeDancerResult.data.dancerByAuthId?.id || '');
    setIsLoading(false);
  }, [activeDancerResult]);

  if (isLoading) {
    return (
      <Box w="70vw">
        <SkeletonCircle size="20" mb={4} />
        <Skeleton height={4} mb={2} />
        <Skeleton height={4} mb={2} />
        <Skeleton height={4} />
      </Box>
    );
  }

  return <Profile id={dancerId} isEditable />;
};

export default ProfileActive;
