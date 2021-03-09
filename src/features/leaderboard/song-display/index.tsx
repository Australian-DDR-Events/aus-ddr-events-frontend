import {
  Avatar,
  Badge,
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  Tooltip,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { Score, Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const SongDisplay = ({
  song,
  score,
  songCoverSize,
}: {
  song: Song;
  score?: Score;
  songCoverSize: string;
}) => {
  const songColors = getColorByDifficulty(song.difficulty);
  const [isSmallerOrEqualTo375, isSmallerOrEqualTo425] = useMediaQuery([
    '(max-width: 375px)',
    '(max-width: 425px)',
  ]);
  return (
    <Flex
      maxW="100%"
      mb={8}
      overflow="hidden"
      borderWidth={2}
      borderRadius="lg"
      borderColor={songColors.border}
      boxShadow={`${defaultPixel * 1.5}px ${defaultPixel * 1.5}px 0 ${
        songColors.shadow
      }`}
      transition="box-shadow 300ms ease-in-out"
      _hover={{
        boxShadow: `${defaultPixel * 1.5 * 1.5}px ${
          defaultPixel * 1.5 * 1.5
        }px 0 ${songColors.shadow}`,
      }}
      w="100%"
      cursor="pointer"
    >
      <Image src={getAssetUrl(song.image128)} h={songCoverSize} />
      <Center>
        <Box ml={2} textAlign="left">
          <Tooltip label={song.name} fontSize="md" placement="top">
            <Text
              fontWeight="bold"
              fontSize={isSmallerOrEqualTo425 ? 'md' : 'xl'}
              isTruncated
              {...(score && isSmallerOrEqualTo425 && { w: '40vw' })}
              {...(!score && isSmallerOrEqualTo425 && { w: '60vw' })}
              {...(score && isSmallerOrEqualTo375 && { w: '32vw' })}
              {...(!score && isSmallerOrEqualTo375 && { w: '55vw' })}
            >
              {song.name}
            </Text>
          </Tooltip>
          <Text
            color="gray"
            mt={-1}
            mb={1}
            isTruncated
            {...(score && isSmallerOrEqualTo425 && { w: '40vw' })}
            {...(!score && isSmallerOrEqualTo425 && { w: '60vw' })}
            {...(score && isSmallerOrEqualTo375 && { w: '32vw' })}
            {...(!score && isSmallerOrEqualTo375 && { w: '52vw' })}
          >
            {song.artist}
          </Text>
          <Badge colorScheme="gray" mb={2} mr={1}>
            Level {song.level}
          </Badge>
          <Badge colorScheme={songColors.badge} mb={2}>
            {song.difficulty}
          </Badge>
        </Box>
      </Center>

      {score && (
        <>
          <Spacer />
          {!isSmallerOrEqualTo425 && (
            <Center>
              <Box mr={4} textAlign="right" w="100%">
                <Text fontWeight="bold" fontSize="xl" isTruncated>
                  {score.dancer?.ddrName}
                </Text>
                <Text
                  fontSize="2xl"
                  mt={-2}
                  color={songColors.shadow}
                  fontWeight="bold"
                >
                  {score.value}
                </Text>
              </Box>
            </Center>
          )}
          <Center>
            <Avatar
              size={isSmallerOrEqualTo425 ? 'md' : 'lg'}
              name={score.dancer?.ddrName}
              src={getAssetUrl(score.dancer?.profilePictureUrl || '')}
              mr={4}
            />
          </Center>
        </>
      )}
    </Flex>
  );
};

export default SongDisplay;
