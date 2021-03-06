import React, { useContext, useEffect, useState } from 'react';
import { Badge, Box, Image, Text } from '@chakra-ui/react';
import { defaultSpacing } from 'types/styled-components';
import { IoMusicalNotes } from 'react-icons/io5';
import CustomIconRatings from 'components/custom-icon-ratings';
import { convertGradeToNumber } from 'utils/summer2021';
import { getAssetUrl } from 'utils/assets';
import { ScoresRepositoryContext } from 'context/scores';
import { Summer2021Score } from 'types/summer2021';
import { SongsRepositoryContext } from 'context/songs';
import { Song } from 'types/core';
import { Dancer } from 'context/dancer';
import { IngredientsRepositoryContext } from '~/context/ingredients';

const ScoreComponent = ({
  score,
  song,
}: {
  score: Summer2021Score;
  song?: Song;
}) => {
  if (!song) return <Text>Uh oh</Text>;
  return (
    <>
      <Box
        w={defaultSpacing * 32}
        borderWidth={2}
        borderRadius="lg"
        overflow="hidden"
        mb={defaultSpacing}
      >
        <Image src={getAssetUrl(song.image256)} alt={song.name} />
        <Box ml={defaultSpacing / 2} mt={defaultSpacing / 4}>
          <Text m={0} fontWeight="bold">
            {`You obtained ${score.gradedIngredient.description}
            ${score.gradedIngredient.name}`}
          </Text>

          <CustomIconRatings
            id={`${score.gradedIngredient.id}-ratings`}
            color="blue"
            icon={IoMusicalNotes}
            rating={convertGradeToNumber(score.gradedIngredient.grade)}
            w={6}
            h={6}
          />
        </Box>

        <Text
          fontWeight="bold"
          fontSize="lg"
          ml={defaultSpacing / 2}
          mt={defaultSpacing / 4}
        >
          {song.name}
        </Text>
        <Box d="flex">
          <Box ml={defaultSpacing / 2}>
            <Text color="gray" mt={-1} mb={1}>
              {song.artist}
            </Text>
            <Badge mb={defaultSpacing / 4}>{song.difficulty}</Badge>
          </Box>
          <Box mr={defaultSpacing / 2} mb={defaultSpacing / 2}>
            <Image
              w="128px"
              src={getAssetUrl(score.gradedIngredient.image128)}
              borderWidth={2}
              borderColor="white"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

const ScoresTab = ({ dancer }: { dancer: Dancer }) => {
  const [scores, setScores] = useState<Summer2021Score[]>(
    new Array<Summer2021Score>(),
  );
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
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
      {!loading &&
        scores.map((score) => (
          <ScoreComponent
            key={score.id}
            score={score}
            song={songs.get(score.score.songId)}
          />
        ))}
    </>
  );
};

export default ScoresTab;
