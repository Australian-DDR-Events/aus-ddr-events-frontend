import {
  Box,
  Container,
  Skeleton,
  SkeletonCircle,
  useMediaQuery,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DancersRepositoryContext, DefaultDancer } from 'context/dancer';
import React, { useContext, useEffect, useState } from 'react';
import { Title } from 'react-head';
import { defaultSpacing } from 'types/styled-components';

import ProfileForm from './profile-form';
import ProfileReadView from './profile-read-view';

interface ProfileProps {
  id?: string;
}

const Profile: React.FC<ProfileProps> = ({ id = undefined }: ProfileProps) => {
  const dancersRepository = useContext(DancersRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const [dancer, setDancer] = useState(DefaultDancer);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  const loggedInUserId = loggedInUser.id;
  const emailVerified = loggedInUser.hasVerifiedEmail;
  const isEditable = !id || loggedInUserId === id;

  useEffect(() => {
    if (!isEditing) {
      setLoading(true);
      const lookupId = id ?? loggedInUserId;
      dancersRepository.dancersRepositoryInstance.get(lookupId).then((u) => {
        setDancer(u.okOrDefault());
        setLoading(false);
      });
    }
  }, [isEditing]);

  const renderProfileReadView = () => (
    <>
      {loading && (
        <Box w="70vw">
          <SkeletonCircle size="20" mb={defaultSpacing / 2} />
          <Skeleton height={defaultSpacing / 2} mb={defaultSpacing / 4} />
          <Skeleton height={defaultSpacing / 2} mb={defaultSpacing / 4} />
          <Skeleton height={defaultSpacing / 2} />
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
      onSuccessfulSubmit={() => {
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
