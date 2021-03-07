import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomIconRatings from 'components/custom-icon-ratings';
import { Dancer } from 'context/dancer';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { IoStar } from 'react-icons/io5';
import { Song } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { Summer2021Score } from 'types/summer2021';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { convertGradeToNumber } from 'utils/summer2021';

const ScoreComponent = ({
  dancerGradedIngredient,
  song,
}: {
  dancerGradedIngredient: Summer2021Score;
  song?: Song;
}) => {
  if (!song) return <Text>Uh oh</Text>;
  const songColors = getColorByDifficulty(song.difficulty);
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px');
  return (
    <Flex
      maxW={isSmallerThan1024 ? '100%' : 'fit-content'}
      overflow="hidden"
      borderWidth={2}
      borderRadius="lg"
      borderColor={songColors.border}
      boxShadow={`${defaultSpacing * 1.5}px ${defaultSpacing * 1.5}px 0 ${
        songColors.shadow
      }`}
      transition="box-shadow 300ms ease-in-out"
      _hover={{
        boxShadow: `${defaultSpacing * 1.5 * 1.5}px ${
          defaultSpacing * 1.5 * 1.5
        }px 0 ${songColors.shadow}`,
      }}
      {...(isSmallerThan1024 && { w: '100%' })}
    >
      <Image
        src={getAssetUrl(song.image128)}
        h={isSmallerThan1024 ? '95px' : '128px'}
      />
      <Box mt={defaultSpacing / 4} ml={defaultSpacing / 4} textAlign="left">
        <Text fontWeight="bold">EX score</Text>
        <Text
          fontSize={isSmallerThan1024 ? 'md' : 'xl'}
          mt={isSmallerThan1024 ? -2 : 0}
        >
          {dancerGradedIngredient.score.value}
        </Text>

        <Text fontWeight="bold">
          {dancerGradedIngredient.gradedIngredient.description}&nbsp;
          {dancerGradedIngredient.gradedIngredient.name}
        </Text>
        <CustomIconRatings
          icon={IoStar}
          id={dancerGradedIngredient.id}
          rating={convertGradeToNumber(
            dancerGradedIngredient.gradedIngredient.grade,
          )}
          color={songColors.shadow}
          w={isSmallerThan1024 ? 5 : 6}
          h={isSmallerThan1024 ? 5 : 6}
          mt={isSmallerThan1024 ? -2 : 0}
        />
      </Box>
      <Spacer />
      <Image
        src={getAssetUrl(dancerGradedIngredient.gradedIngredient.image128)}
        h={isSmallerThan1024 ? '90px' : '128px'}
      />
    </Flex>
  );
};

const ScoresTab = ({ dancer }: { dancer: Dancer }) => {
  const [scores, setScores] = useState<Summer2021Score[]>(
    new Array<Summer2021Score>(),
  );
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
  const [isLargerThan1440] = useMediaQuery(['(min-width: 1440px)']);
  const [songs, setSongs] = useState<Map<string, Song>>(new Map());
  const [loading, setIsLoading] = useState(true);

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

  return (
    <>
      {!loading && (
        <SimpleGrid
          spacing={defaultSpacing}
          columns={isLargerThan1440 ? 2 : 1}
          mt={defaultSpacing / 4}
          w="fit-content"
          pr={isLargerThan1440 ? defaultSpacing : 0}
        >
          {scores.map((score) => (
            <ScoreComponent
              key={score.id}
              dancerGradedIngredient={score}
              song={songs.get(score.score.songId)}
            />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ScoresTab;
