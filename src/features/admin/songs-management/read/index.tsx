import { Badge, Box, Button, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const SongReadView = ({ song }: { song: Song }) => {
  const currentSongColor = getColorByDifficulty(song.difficulty);
  return (
    <Box
      w={defaultPixel * 32}
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
      mb={8}
      cursor="pointer"
    >
      <Image src={getAssetUrl(song.image256)} alt={song.name} />
      <Box ml={4}>
        <Text fontWeight="bold" fontSize="lg" mt={2}>
          {song.name}
        </Text>
        <Text color="gray" mt={-1} mb={1}>
          {song.artist}
        </Text>
        <Badge colorScheme="gray" mb={2} mr={1}>
          Level {song.level}
        </Badge>
        <Badge colorScheme={currentSongColor.badge} mb={2}>
          {song.difficulty}
        </Badge>
        <Box mt={4} mb={2}>
          <Button>Edit</Button>
          <Button ml={2} colorScheme="red">
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SongReadView;
