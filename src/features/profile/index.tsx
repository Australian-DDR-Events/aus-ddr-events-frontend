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

interface ProfileProps {
  id: string;
  isEditable?: boolean;
}

const Profile: React.FC<ProfileProps> = ({
  id,
  isEditable = false,
}: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isLargerThan767] = useMediaQuery('(min-width: 767px)');

  return <></>;
  // const renderProfileReadView = () => (
  //   <>
  //     {fetching && (
  //       <Box w="70vw">
  //         <SkeletonCircle size="20" mb={4} />
  //         <Skeleton height={4} mb={2} />
  //         <Skeleton height={4} mb={2} />
  //         <Skeleton height={4} />
  //       </Box>
  //     )}
  //     {!fetching && (
  //       <ProfileReadView
  //         isEditable={isEditable}
  //         dancer={data?.dancerById!}
  //         onEditButtonClick={() => {
  //           setIsEditing(true);
  //         }}
  //       />
  //     )}
  //   </>
  // );

  // const renderProfileForm = () => (
  //   <ProfileForm
  //     formData={data?.dancerById!}
  //     onSuccessfulSubmit={() => {
  //       reloadProfile();
  //       setIsEditing(false);
  //     }}
  //     onCancelSubmit={() => {
  //       reloadProfile();
  //       setIsEditing(false);
  //     }}
  //   />
  // );

  // return (
  //   <Container maxW={isLargerThan767 ? '90%' : '100%'} w="fit-content">
  //     {!fetching && (
  //       <Title>{data?.dancerById!.ddrName} | Australian DDR Events</Title>
  //     )}
  //     {isEditing ? renderProfileForm() : renderProfileReadView()}
  //   </Container>
  // );
};

export default Profile;
