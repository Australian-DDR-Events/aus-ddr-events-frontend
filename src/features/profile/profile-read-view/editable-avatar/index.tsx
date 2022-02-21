import { Avatar, Box, Icon, Text, useColorMode } from '@chakra-ui/react';
import { IoPerson } from '@react-icons/all-files/io5/IoPerson';
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
  const { colorMode } = useColorMode();

  return (
    <>
      <Box
        onMouseEnter={() => setIsHovering(true && isEditable)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsModalOpen(true)}
        position="relative"
      >
        <Avatar
          size="2xl"
          src={dancerIdToAvatar(dancerId, 256)}
          mb={4}
          bgColor="transparent"
          icon={
            <Icon
              as={IoPerson}
              fill={colorMode === 'light' ? 'gray.800' : 'gray.200'}
              w={24}
              h={24}
            />
          }
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
