import { Avatar, Box, Center, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import { Score } from '../../../../types/core';
import { getAssetUrl } from '../../../../utils/assets';

const TopScore = ({ score }: { score: Score }) => {
  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg" padding={2}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={2}>
          <Avatar
            size="2xl"
            src={getAssetUrl(score.dancer?.profilePictureUrl || '')}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TopScore;
