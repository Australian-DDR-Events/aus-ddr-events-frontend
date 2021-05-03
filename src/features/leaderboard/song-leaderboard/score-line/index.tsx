import { Avatar, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { IoCamera } from '@react-icons/all-files/io5/IoCamera';
import React from 'react';
import { IndividualSongLeaderboardTopScoreFragment } from 'types/graphql.generated';
import { getProfileImageUrl } from 'utils/assets';

const ScoreLine = ({
  index,
  score,
  onClickImage,
  onClickName,
  color,
}: {
  index: number;
  score: IndividualSongLeaderboardTopScoreFragment;
  onClickImage: Function;
  onClickName: Function;
  color: string;
}) => {
  const leaderNumber: number = index + 2;
  return (
    <Center key={score.id} mb={2} maxW="100%">
      <Flex>
        <Center fontWeight="bold" color={color} mr={4}>
          <Text fontSize="3xl">{leaderNumber}</Text>
        </Center>
        <Spacer />

        <Flex
          w={{ base: '80vw', md: 'xl' }}
          maxW="100%"
          borderRadius="full"
          padding={2}
          borderWidth={2}
          borderColor={color}
        >
          <Flex onClick={() => onClickName()} cursor="pointer">
            <Center>
              <Avatar
                name={score.dancer?.ddrName || ''}
                src={getProfileImageUrl(score.dancer?.profilePictureUrl || '')}
                size="md"
                mr={4}
              />
            </Center>
            <Center>
              <Text fontWeight="bold" fontSize="xl">
                {score.dancer?.ddrName}
              </Text>
            </Center>
          </Flex>

          <Spacer />

          <Center>
            <Text fontSize="2xl" mr={4}>
              {score.value}
            </Text>
          </Center>
          <Center>
            <Icon
              as={IoCamera}
              w={6}
              h={6}
              color={color}
              onClick={() => onClickImage()}
              mr={4}
              cursor="pointer"
            />
          </Center>
        </Flex>
      </Flex>
    </Center>
  );
};

export default ScoreLine;
