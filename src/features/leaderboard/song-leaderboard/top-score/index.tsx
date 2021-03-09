import { Avatar, Box, Heading, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { IoCamera } from 'react-icons/io5';
import { Score } from 'types/core';
import { defaultPixel } from 'types/styled';
import { getProfileImageUrl } from 'utils/assets';

const TopScore = ({
  score,
  onClickImage,
  onClickUser,
}: {
  score: Score;
  onClickImage: Function;
  onClickUser: Function;
}) => {
  return (
    <Box maxW="md" p={2}>
      <Stack direction="column" alignItems="center">
        <Icon
          as={FaCrown}
          color="gold"
          w={defaultPixel * 2}
          h={defaultPixel * 2}
          mb={-2}
        />
        <Avatar
          size="2xl"
          name={score.dancer?.ddrName || ''}
          src={getProfileImageUrl(score.dancer?.profilePictureUrl || '')}
          borderWidth={4}
          borderColor="gold"
          onClick={() => onClickUser()}
          cursor="pointer"
        />
      </Stack>

      <Heading
        size="lg"
        textAlign="center"
        mt={1}
        cursor="pointer"
        onClick={() => onClickUser()}
      >
        {score.dancer?.ddrName || ''}
      </Heading>
      <Heading
        color="yellow.400"
        size="2xl"
        textAlign="center"
        mt={-2}
        onClick={() => onClickImage()}
        cursor="pointer"
      >
        {score.value}
        <Icon
          as={IoCamera}
          w={8}
          h={8}
          color="yellow.400"
          onClick={() => onClickImage()}
          ml={2}
          cursor="pointer"
        />
      </Heading>
    </Box>
  );
};

export default TopScore;
