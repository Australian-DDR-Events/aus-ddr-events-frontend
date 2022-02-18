import { Avatar, Box, Text } from '@chakra-ui/react';
import OverlayedUploadModal from 'components/overlayed-upload-modal';
import React, { useState } from 'react';
import { dancerIdToAvatar } from 'utils/assets';

interface EditableAvatarProps {
  dancerId: string;
  isEditable: boolean;
}

const EditableAvatar = ({ dancerId, isEditable }: EditableAvatarProps) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Box
        onMouseEnter={() => setIsHovering(true && isEditable)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsModalOpen(true)}
        // onMouseOver={() => setIsHovering(true && isEditable)}
        // onMouseOut={() => setIsHovering(false)}
        position="relative"
      >
        <Avatar
          size="2xl"
          src={dancerIdToAvatar(dancerId, 256)}
          mb={4}
          bgColor="transparent"
          transition="0.2s"
          _hover={
            isHovering
              ? {
                  opacity: '0.5',
                  transition: '0.2s',
                }
              : {}
          }
        />
        {isHovering && (
          <Text
            left="50%"
            top="50%"
            transform="translate(-50%,-50%)"
            position="absolute"
            textAlign="center"
            pointerEvents="none"
          >
            Change Avatar
          </Text>
        )}
      </Box>
      {isModalOpen && (
        <OverlayedUploadModal
          uploadDestination="/dancers/avatar"
          title="Avatar"
          onClose={() => setIsModalOpen(false)}
          maxX={256}
          maxY={256}
        />
      )}
    </>
  );
};

export default EditableAvatar;
