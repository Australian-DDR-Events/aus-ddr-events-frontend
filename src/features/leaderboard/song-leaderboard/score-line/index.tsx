import { Avatar, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { IoCamera } from 'react-icons/io5';
import { Score } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { getProfileImageUrl } from 'utils/assets';

const ScoreLine = ({
  index,
  score,
  onClickImage,
  onClickName,
  color,
}: {
  index: number;
  score: Score;
  onClickImage: Function;
  onClickName: Function;
  color: string;
}) => {
  const leaderNumber: number = index + 2;
  return (
    <Center key={score.id} mb={defaultSpacing / 4}>
      <Flex w="xl" maxW="xl">
        <Center fontWeight="bold" color={color} mr={defaultSpacing / 2}>
          <Text fontSize="3xl">{leaderNumber}</Text>
        </Center>
        <Spacer />

        <Flex
          w="xl"
          maxW="100%"
          borderRadius="full"
          padding={defaultSpacing / 4}
          borderWidth={2}
          borderColor={color}
        >
          <Flex onClick={() => onClickName()} cursor="pointer">
            <Center>
              <Avatar
                src={getProfileImageUrl(score.dancer?.profilePictureUrl || '')}
                size="md"
                mr={defaultSpacing / 2}
                bgColor="transparent"
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
            <Text fontSize="2xl" mr={defaultSpacing / 2}>
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
              mr={defaultSpacing / 2}
              cursor="pointer"
            />
          </Center>
        </Flex>
      </Flex>
    </Center>
  );
};

export default ScoreLine;
