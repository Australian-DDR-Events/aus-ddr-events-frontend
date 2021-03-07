import { Box, Center, Grid, GridItem, Icon, ListItem } from '@chakra-ui/react';
import React from 'react';
import { IoCamera } from 'react-icons/io5';

import { Score } from '../../../../types/core';

const ScoreLine = ({
  index,
  score,
  onClickImage,
  onClickName,
}: {
  index: number;
  score: Score;
  onClickImage: Function;
  onClickName: Function;
}) => {
  return (
    <ListItem key={score.id} mb={1}>
      <Center>
        <Box w="xl" maxW="xl" borderWidth="1px" borderRadius="sm" padding={1}>
          <Grid templateColumns="repeat(16, 1fr)" gap={2}>
            <GridItem colSpan={1}>{index + 2}</GridItem>
            <GridItem colSpan={5} onClick={() => onClickName()}>
              {score.dancer?.ddrName}
            </GridItem>
            <GridItem colSpan={5}>{score.value}</GridItem>
            <GridItem colSpan={2} onClick={() => onClickImage()}>
              <Icon as={IoCamera} />
            </GridItem>
          </Grid>
        </Box>
      </Center>
    </ListItem>
  );
};

export default ScoreLine;
