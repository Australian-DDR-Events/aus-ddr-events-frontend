import {
  Center,
  Flex,
  Heading,
  Image,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Title } from 'react-head';
import { songIdToJacket } from 'utils/assets';

import { GetSongById } from './service';

interface SongProps {
  songId: string;
}

const Song = ({ songId }: SongProps) => {
  const { data, error } = GetSongById(songId);

  return (
    <>
      {data && <Title>{data.name} | Australian DDR Events</Title>}
      <Flex justifyContent="center">
        <Center>
          <Image src={songIdToJacket(songId, 512)} />
        </Center>
        <Center>
          <Stack>
            {!data ? (
              <Skeleton />
            ) : (
              <Text fontWeight="bold" fontSize="xl">
                {data.name}
              </Text>
            )}
            {!data ? (
              <SkeletonText />
            ) : (
              <Text fontSize="lg" colorScheme="gray">
                {data.artist}
              </Text>
            )}
          </Stack>
        </Center>
      </Flex>
    </>
  );
};

export default Song;
