import {
  Box,
  Center,
  Container,
  Skeleton,
  SkeletonCircle,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Title } from 'react-head';

import { useGetDancerByIdQuery } from './operation.generated';
import ProfileForm from './profile-form';
import ProfileReadView from './profile-read-view';

interface ProfileProps {
  id: string;
  isEditable?: boolean;
}

const Profile = ({ id, isEditable = false }: ProfileProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);

  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  const [{ data, fetching }, reloadProfile] = useGetDancerByIdQuery({
    variables: {
      dancerId: id,
    },
  });

  const renderProfileReadView = () => (
    <>
      {fetching && (
        <Center>
          <Box w="70vw">
            <SkeletonCircle size="20" mb={4} />
            <Skeleton height={4} mb={2} />
            <Skeleton height={4} mb={2} />
            <Skeleton height={4} />
          </Box>
        </Center>
      )}
      {!fetching && (
        <ProfileReadView
          isEditable={isEditable}
          dancer={data?.dancerById!}
          onEditButtonClick={() => {
            setIsEditing(true);
          }}
        />
      )}
    </>
  );

  const renderProfileForm = () => (
    <ProfileForm
      formData={data?.dancerById!}
      onSuccessfulSubmit={() => {
        reloadProfile({ requestPolicy: 'network-only' });
        setIsEditing(false);
      }}
      onCancelSubmit={() => {
        reloadProfile();
        setIsEditing(false);
      }}
    />
  );

  return (
    <Container maxW={isLargerThan767 ? '90%' : '100%'} w="fit-content">
      {!fetching && (
        <Title>{data?.dancerById!.ddrName} | Australian DDR Events</Title>
      )}
      {isEditing ? renderProfileForm() : renderProfileReadView()}
    </Container>
  );
};

export default Profile;
