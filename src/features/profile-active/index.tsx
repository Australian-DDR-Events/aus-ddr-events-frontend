import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Container,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import Profile from 'features/profile';
import React from 'react';

import { GetCurrentUser } from './service';

const ProfileActive = () => {
  const { loading, data, error } = GetCurrentUser();

  if (loading) {
    return (
      <Box w="70vw">
        <SkeletonCircle size="20" mb={4} />
        <Skeleton height={4} mb={2} />
        <Skeleton height={4} mb={2} />
        <Skeleton height={4} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Container maxW="sm" mb={8}>
        <Alert status="error" borderRadius="md" mb={4}>
          <Box flex="1">
            <AlertTitle mr={2}>
              Uh oh! We can&apos;t load your profile.
            </AlertTitle>
            <AlertDescription>
              Let the developers know and we&apos;ll sort you out.
            </AlertDescription>
          </Box>
        </Alert>
      </Container>
    );
  }

  return <Profile id={data?.id} isEditable />;
};

export default ProfileActive;
