import {
  Box,
  Container,
  Skeleton,
  SkeletonCircle,
  useMediaQuery,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { Dancer, DefaultDancer } from 'context/dancer';
import React, { useContext, useEffect, useState } from 'react';
import { Title } from 'react-head';

import { useGetDancerByIdQuery } from './operation.generated';
import ProfileForm from './profile-form';
import ProfileReadView from './profile-read-view';

interface ProfileProps {
  id?: string;
}

const Profile: React.FC<ProfileProps> = ({ id = undefined }: ProfileProps) => {
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [dancer, setDancer] = useState(DefaultDancer);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  const authId = loggedInUser.id;
  const emailVerified = loggedInUser.hasVerifiedEmail;
  const isEditable = !id || authId === id;

  const [result] = useGetDancerByIdQuery({
    variables: {
      dancerId: id || authId,
    },
  });

  useEffect(() => {
    if (!isEditing) {
      setLoading(true);

      if (!result || result.fetching || !result.data) return;
      setDancer({
        ...DefaultDancer,
        ...result.data.dancerById,
      });
      setLoading(false);
    }
  }, [result, isEditing]);

  const renderProfileReadView = () => (
    <>
      {loading && (
        <Box w="70vw">
          <SkeletonCircle size="20" mb={4} />
          <Skeleton height={4} mb={2} />
          <Skeleton height={4} mb={2} />
          <Skeleton height={4} />
        </Box>
      )}
      {!loading && (
        <ProfileReadView
          isEditable={isEditable}
          dancer={dancer}
          emailVerified={emailVerified}
          onEditButtonClick={() => {
            setIsEditing(true);
          }}
        />
      )}
    </>
  );

  const renderProfileForm = () => (
    <ProfileForm
      formData={dancer}
      onSuccessfulSubmit={(updatedDancer: Dancer) => {
        setDancer(updatedDancer);
        setIsEditing(false);
      }}
      onCancelSubmit={() => {
        setIsEditing(false);
      }}
    />
  );

  return (
    <Container maxW={isLargerThan767 ? '90%' : '100%'} w="fit-content">
      {!loading && <Title>{dancer.ddrName} | Australian DDR Events</Title>}
      {isEditing ? renderProfileForm() : renderProfileReadView()}
    </Container>
  );
};

export default Profile;
