import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DefaultDancer, DancersRepositoryContext } from 'context/dancer';
import { Title } from 'react-head';
import { Container, Skeleton, useMediaQuery } from '@chakra-ui/react';
import ProfileForm from './components/profile-form';
import ProfileReadView from './components/profile-read-view';

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

  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');

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
      {loading && <Skeleton />}
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
    <Container maxW={isLargerThan800 ? '90%' : '100%'}>
      {!loading && <Title>{dancer.dancerName} | Australian DDR Events</Title>}
      {isEditing ? renderProfileForm() : renderProfileReadView()}
    </Container>
  );
};

export default Profile;
