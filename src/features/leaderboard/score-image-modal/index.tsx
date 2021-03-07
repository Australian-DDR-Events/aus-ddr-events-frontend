import {
  Center,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
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
  const [isSmallerOrEqualTo425] = useMediaQuery(['(max-width: 425px)']);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <Center>
          <Image w={isSmallerOrEqualTo425 ? '100vw' : '64vw'} src={imageUrl} />
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ScoreImageModal;
