import {
  Center,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const ScoreImageModal = ({
  imageUrl,
  isOpen,
  onClose,
}: {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <Center>
          <Image w={256} src={imageUrl} />
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ScoreImageModal;
