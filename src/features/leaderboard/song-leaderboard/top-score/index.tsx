import { Avatar, Box, Heading, Icon, Stack } from '@chakra-ui/react';
import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { Score } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { getProfileImageUrl } from 'utils/assets';

const TopScore = ({ score }: { score: Score }) => {
  return (
    <Box maxW="md" p={2}>
      <Stack direction="column" alignItems="center">
        <Icon
          as={FaCrown}
          color="gold"
          w={defaultSpacing * 2}
          h={defaultSpacing * 2}
          mb={-defaultSpacing / 4}
        />
        <Avatar
          size="2xl"
          name={score.dancer?.ddrName || ''}
          src={getProfileImageUrl(score.dancer?.profilePictureUrl || '')}
          borderWidth={defaultSpacing / 2}
          borderColor="gold"
        />
      </Stack>

      <Heading size="lg" textAlign="center" mt={1}>
        {score.dancer?.ddrName || ''}
      </Heading>
      <Heading
        color="yellow.400"
        size="2xl"
        textAlign="center"
        mt={-defaultSpacing / 4}
      >
        {score.value}
      </Heading>
    </Box>
  );
};

export default TopScore;
