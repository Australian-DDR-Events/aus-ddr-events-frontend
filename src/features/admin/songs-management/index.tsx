import {
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Song } from 'types/core';
import { useQuery } from 'urql';

import SongReadView from './read';

const GetAllSongs = `
query {
  songs(first: 50) {
    nodes {
      id
      name
      artist
      difficulty
      level
      image256
    }
  }
}`;

const SongsManagement = () => {
  const [result] = useQuery({
    query: GetAllSongs,
  });
  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const gridColumns = 4;
  const totalCourseCoverWidth = 256 + 8;
  const padding = 32 * 2;

  return (
    <>
      <Heading textAlign="center">Songs management</Heading>
      <Center mt={4}>
        <Button
          variant="solid"
          colorScheme="pink"
          leftIcon={<IoAddCircleOutline />}
        >
          Add a new song
        </Button>
      </Center>
      <Container maxW={gridColumns * totalCourseCoverWidth + padding} p={4}>
        <SimpleGrid spacing={4} columns={4}>
          {data.songs.nodes.map((song: Song) => (
            <SongReadView song={song} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};
export default SongsManagement;
