import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { Dish } from 'types/summer2021';

import SongDisplay from '../song-display';

export const SONGS_VIEW = 'song';
export const COOK_VIEW = 'cook';
export type View = typeof SONGS_VIEW | typeof COOK_VIEW;

const DishModal = ({
  view,
  dish,
  isOpen,
  onClose,
}: {
  view: View;
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course - {dish.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {view === SONGS_VIEW &&
              dish.dishSongs.map(
                (ds) => ds.song && <SongDisplay key={ds.id} song={ds.song} />,
              )}
            {view === COOK_VIEW && 'lol'}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DishModal;
