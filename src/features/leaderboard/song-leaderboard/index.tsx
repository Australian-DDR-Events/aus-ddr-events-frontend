import {
  Avatar,
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { ScoresRepositoryContext } from 'context/scores';
import { DefaultSong, SongsRepositoryContext } from 'context/songs';
import React, { useContext, useEffect, useState } from 'react';
import { IoCamera } from 'react-icons/io5';
import { Score } from 'types/core';
import { defaultSpacing } from 'types/styled-components';
import { getAssetUrl } from 'utils/assets';
import { getColorByDifficulty } from 'utils/song-difficulty-colors';
import { useLocation } from 'wouter';

import ScoreImageModal from '../score-image-modal';

const SongLeaderboard = ({ songId }: { songId: string }) => {
  const songsRepo = useContext(SongsRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [song, setSong] = useState(DefaultSong);
  const [scores, setScores] = useState(new Array<Score>());

  const [, setLocation] = useLocation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    songsRepo.songsRepositoryInstance.getById(songId).then((result) => {
      if (result.isOk()) setSong(result.value);
    });
    scoresRepo.scoresRepositoryInstance
      .getAll({
        songId: new Array<string>(songId),
      })
      .then((result) => {
        if (result.isOk())
          setScores(result.value.sort((s1, s2) => s2.value - s1.value));
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <></>;

  return (
    <Container maxW="container.xl">
      <Center>
        <Flex
          w={defaultSpacing * 64}
          borderWidth={2}
          borderColor={getColorByDifficulty(song.difficulty).border}
          br={2}
          mb={8}
        >
          <Image src={getAssetUrl(song.image128)} />
          <Box ml={defaultSpacing / 2} mb={2}>
            <Text fontWeight="bold" fontSize="lg" mt={defaultSpacing / 4}>
              {song.name}
            </Text>
            <Text color="gray" mt={-1} mb={1}>
              {song.artist}
            </Text>
            <Badge
              colorScheme={getColorByDifficulty(song.difficulty).badge}
              mb={defaultSpacing / 4}
            >
              {song.difficulty}
            </Badge>
          </Box>
        </Flex>
      </Center>
      <ScoreImageModal
        imageUrl={modalUrl}
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <Center mb={4}>
        <Box maxW="md" borderWidth="1px" borderRadius="lg" padding={2}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem rowSpan={2}>
              <Avatar
                size="2xl"
                src={getAssetUrl(scores[0]?.dancer?.profilePictureUrl || '')}
              />
            </GridItem>
          </Grid>
        </Box>
      </Center>
      <List>
        {scores.map((s, index) => {
          return (
            <ListItem key={s.id} mb={1}>
              <Center>
                <Box
                  w="xl"
                  maxW="xl"
                  borderWidth="1px"
                  borderRadius="sm"
                  padding={1}
                >
                  <Grid templateColumns="repeat(16, 1fr)" gap={2}>
                    <GridItem colSpan={1}>{index + 1}</GridItem>
                    <GridItem
                      colSpan={5}
                      onClick={() => setLocation(`/profile/${s.dancer?.id}`)}
                    >
                      {s.dancer?.ddrName}
                    </GridItem>
                    <GridItem colSpan={5}>{s.value}</GridItem>
                    <GridItem
                      colSpan={2}
                      onClick={() => {
                        setModalUrl(getAssetUrl(s.imageUrl));
                        setModalIsOpen(true);
                      }}
                    >
                      <Icon as={IoCamera} />
                    </GridItem>
                  </Grid>
                </Box>
              </Center>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default SongLeaderboard;
