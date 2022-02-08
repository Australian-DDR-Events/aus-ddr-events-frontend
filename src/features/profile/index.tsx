import {
  Box,
  Container,
  Skeleton,
  SkeletonCircle,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Title } from 'react-head';

import ProfileForm from './profile-form';
import ProfileReadView from './profile-read-view';
import { GetUserById } from './service';

interface ProfileProps {
  id: string;
  isEditable?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  id,
  isEditable = false,
}: ProfileProps) => {
  const { data, loading, refetch } = GetUserById(id);
  const [isEditing, setIsEditing] = useState(false);

  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

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
      {!loading && data && (
        <ProfileReadView
          isEditable={isEditable}
          dancer={data}
          onEditButtonClick={() => {
            setIsEditing(true);
          }}
        />
      )}
    </>
  );

  const renderProfileForm = () => (
    <ProfileForm
      formData={data!}
      onSuccessfulSubmit={() => {
        refetch!();
        setIsEditing(false);
      }}
      onCancelSubmit={() => {
        refetch!();
        setIsEditing(false);
      }}
    />
  );

  return (
    <Container maxW={isLargerThan767 ? '90%' : '100%'} w="fit-content">
      {!loading && data && <Title>{data.name} | Australian DDR Events</Title>}
      {isEditing && data ? renderProfileForm() : renderProfileReadView()}
    </Container>
  );
};

export default Profile;
