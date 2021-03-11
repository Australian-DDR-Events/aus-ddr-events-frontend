import { Center, SimpleGrid, Spinner, useMediaQuery } from '@chakra-ui/react';
import { Dancer } from 'context/dancer';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { Song } from 'types/core';
import { defaultPixel } from 'types/styled';
import { Summer2021Score } from 'types/summer2021';

import IngredientScoreDisplay from './ingredient-score-display';

const ScoresTab = ({ dancer }: { dancer: Dancer }) => {
  const [scores, setScores] = useState<Summer2021Score[]>(
    new Array<Summer2021Score>(),
  );
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
  const [isLargerThan1440] = useMediaQuery(['(min-width: 1440px)']);
  const [songs, setSongs] = useState<Map<string, Song>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ingredientsRepository.ingredientsRepositoryInstance
      .getGradedIngredientsByDancer(dancer.id, true)
      .then((result) => {
        const songIds = result.okOrDefault().map((r) => r.score.songId);
        songsRepository.songsRepositoryInstance
          .getByIds(songIds)
          .then((songsResult) => {
            setScores(result.okOrDefault());
            setSongs(new Map(songsResult.okOrDefault().map((s) => [s.id, s])));
            setIsLoading(false);
          });
      });
  }, []);

  if (isLoading)
    return (
      <Center>
        <Spinner // todo: replace this with proper skeleton structure
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <SimpleGrid
      spacing={8}
      columns={isLargerThan1440 ? 2 : 1}
      mt={2}
      mb={8}
      w="fit-content"
      pr={isLargerThan1440 ? defaultPixel : 0}
    >
      {scores.map((score) => (
        <IngredientScoreDisplay
          key={score.id}
          dancerGradedIngredient={score}
          song={songs.get(score.score.songId)}
        />
      ))}
    </SimpleGrid>
  );
};

export default ScoresTab;
