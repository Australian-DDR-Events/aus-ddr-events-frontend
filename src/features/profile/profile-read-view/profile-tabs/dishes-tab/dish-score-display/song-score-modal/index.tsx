import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import { Score } from 'types/core';

import SongScoreDisplay from './song-score-display';

const SongScoreModal = ({
  scores,
  isOpen,
  onClose,
}: {
  scores: Score[];
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Songs breakdown</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing={8}>
            {scores.map((score) => (
              <SongScoreDisplay score={score} />
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SongScoreModal;
