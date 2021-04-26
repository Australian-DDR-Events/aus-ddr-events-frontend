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
import { AllSongDifficultiesLeaderboardFragment } from 'types/graphql.generated';
import { defaultPixel } from 'types/styled';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';

const SongDisplay = ({
  songDifficulty,
  songCoverSize,
}: {
  songDifficulty: AllSongDifficultiesLeaderboardFragment;
  songCoverSize: string;
}) => {
  const songColors = getColorByDifficulty(songDifficulty.difficulty);
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
      <Image
        src={getAssetUrl(songDifficulty.song!.image128)}
        h={songCoverSize}
      />
      <Center>
        <Box ml={2} textAlign="left">
          <Tooltip
            label={songDifficulty.song!.name}
            fontSize="md"
            placement="top"
          >
            <Text
              fontWeight="bold"
              fontSize={isSmallerOrEqualTo425 ? 'md' : 'xl'}
              isTruncated
              {...(songDifficulty.topScore &&
                isSmallerOrEqualTo425 && { w: '40vw' })}
              {...(!songDifficulty.topScore &&
                isSmallerOrEqualTo425 && { w: '60vw' })}
              {...(songDifficulty.topScore &&
                isSmallerOrEqualTo375 && { w: '32vw' })}
              {...(!songDifficulty.topScore &&
                isSmallerOrEqualTo375 && { w: '55vw' })}
            >
              {songDifficulty.song!.name}
            </Text>
          </Tooltip>
          <Text
            color="gray"
            mt={-1}
            mb={1}
            isTruncated
            {...(songDifficulty.topScore &&
              isSmallerOrEqualTo425 && { w: '40vw' })}
            {...(!songDifficulty.topScore &&
              isSmallerOrEqualTo425 && { w: '60vw' })}
            {...(songDifficulty.topScore &&
              isSmallerOrEqualTo375 && { w: '32vw' })}
            {...(!songDifficulty.topScore &&
              isSmallerOrEqualTo375 && { w: '52vw' })}
          >
            {songDifficulty.song!.artist}
          </Text>
          <Badge colorScheme="gray" mb={2} mr={1}>
            Level {songDifficulty.level}
          </Badge>
          <Badge colorScheme={songColors.badge} mb={2}>
            {songDifficulty.difficulty}
          </Badge>
        </Box>
      </Center>

      {songDifficulty.topScore && (
        <>
          <Spacer />
          {!isSmallerOrEqualTo425 && (
            <Center>
              <Box mr={4} textAlign="right" w="100%">
                <Text fontWeight="bold" fontSize="xl" isTruncated>
                  {songDifficulty.topScore.dancer?.ddrName}
                </Text>
                <Text
                  fontSize="2xl"
                  mt={-2}
                  color={songColors.shadow}
                  fontWeight="bold"
                >
                  {songDifficulty.topScore.value}
                </Text>
              </Box>
            </Center>
          )}
          <Center>
            <Avatar
              size={isSmallerOrEqualTo425 ? 'md' : 'lg'}
              name={songDifficulty.topScore.dancer?.ddrName}
              src={getAssetUrl(
                songDifficulty.topScore.dancer?.profilePictureUrl || '',
              )}
              mr={4}
            />
          </Center>
        </>
      )}
    </Flex>
  );
};

export default SongDisplay;
