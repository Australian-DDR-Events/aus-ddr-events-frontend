/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { useContext, useState, useEffect } from 'react';
import { Image, Typography, Space, Card, Rate, Divider } from 'antd';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultGrade, DefaultIngredient } from 'context/ingredients/constants';
import { DefaultScore, DefaultSummer2021Score } from 'context/scores/constants';
import { ScoresRepositoryContext } from 'context/scores';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DefaultDancer, DancersRepositoryContext } from 'context/dancer';
import { SongsRepositoryContext } from 'context/songs';
import { DefaultSong } from 'context/songs/constants';
import { JacketDifficulty, IngredientsContainer } from './styled';

const { Text, Paragraph, Title } = Typography;

const Ingredients = () => {
  const ingredientsRepo = useContext(IngredientsRepositoryContext);
  const songsRepo = useContext(SongsRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const dancersRepo = useContext(DancersRepositoryContext);
  const [songs, setSongs] = useState(Array(DefaultSong));
  const [ingredients, setIngredients] = useState(Array(DefaultIngredient));
  const [scores, setScores] = useState(Array(DefaultScore));
  const [currentScores, setCurrentScores] = useState(
    Array(DefaultSummer2021Score),
  );
  const [grades, setGrades] = useState(Array(DefaultGrade));
  const [dancer, setDancer] = useState(DefaultDancer);
  const [loading, setLoading] = useState(true);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();
  const loggedInUserId = loggedInUser.id;

  useEffect(() => {
    if (loading) {
      ingredientsRepo.ingredientsRepositoryInstance
        .getAll()
        .then((ingredientsRes) => {
          setIngredients(ingredientsRes.okOrDefault());
          setLoading(false);
        });

      const lookupId = loggedInUserId;
      dancersRepo.dancersRepositoryInstance.get(lookupId).then((dancerRes) => {
        setDancer(dancerRes.okOrDefault());
        setLoading(false);
      });

      songsRepo.songsRepositoryInstance.getAll().then((songsRes) => {
        setSongs(songsRes.okOrDefault());
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {
    if (dancer) {
      scoresRepo.scoresRepositoryInstance
        .getAll({ dancerId: [dancer.id] })
        .then((scoresRes) => {
          setScores(scoresRes.okOrDefault());
          setLoading(false);
        });
    }
  }, [dancer]);

  useEffect(() => {
    if (ingredients && dancer) {
      // Get grades -> flat() the results.
      const gradesPromises = ingredients.map((ingredient) =>
        ingredientsRepo.ingredientsRepositoryInstance.getGrades(ingredient.id),
      );
      Promise.all(gradesPromises).then((results) => {
        const GradesResults = Object.values(results).map((gradesRes) =>
          gradesRes.okOrDefault(),
        );
        const flattenGradesArray = GradesResults.flat();
        setGrades(flattenGradesArray);
        setLoading(false);
      });

      // Get summer2021scores -> flat() the results.
      const scoresPromises = ingredients.map((ingredientsId) =>
        scoresRepo.scoresRepositoryInstance.getSummer2021({
          dancerId: dancer.id,
          ingredientId: ingredientsId.id,
        }),
      );

      Promise.all(scoresPromises).then((results) => {
        const ScoresResults = Object.values(results).map((scoresRes) =>
          scoresRes.okOrDefault(),
        );

        const flattenScoresArray = ScoresResults.flat();
        setCurrentScores(flattenScoresArray);
        setLoading(false);
      });
    }
  }, [ingredients, dancer]);

  const gradeToInt = (grade: string) => {
    if (grade === 'E') {
      return 1;
    }
    if (grade === 'B') {
      return 2;
    }
    if (grade === 'A') {
      return 3;
    }
    if (grade === 'AA') {
      return 4;
    }
    if (grade === 'AAA') {
      return 5;
    }
    return 0;
  };

  return (
    <>
      {!loading && (
        <IngredientsContainer>
          {ingredients.map((ingredient) => {
            return (
              <Space>
                <IngredientsContainer>
                  <Card
                    style={{
                      maxWidth: '176px',
                      height: '516px',
                      margin: '2px',
                    }}
                  >
                    <Paragraph>
                      <Title level={4}>{ingredient.name}</Title>
                    </Paragraph>
                    <Image
                      preview={false}
                      style={{ padding: '4px' }}
                      src={`${process.env.ASSETS_URL}${ingredient.image64}`}
                      alt="ingredientimage"
                    />
                    <Divider />
                    {songs.map((song) => {
                      if (ingredient.songId === song.id) {
                        return (
                          <>
                            <JacketDifficulty
                              className={song.difficulty}
                              src={`${process.env.ASSETS_URL}${song.image64}`}
                            />
                            <Paragraph>{song.name}</Paragraph>
                          </>
                        );
                      }
                    })}

                    <Paragraph>
                      {scores.map((score) => {
                        if (ingredient.songId === score.songId) {
                          return (
                            <Text>
                              <Text style={{ fontWeight: 'bold' }}>
                                EX Score:{' '}
                              </Text>
                              [{score.value}]
                            </Text>
                          );
                        }
                      })}
                    </Paragraph>

                    <Paragraph>
                      {scores.map((score) => {
                        if (ingredient.songId === score.songId) {
                          return currentScores.map((cs) => {
                            if (score.id === cs.scoreId) {
                              return grades
                                .filter((grade) =>
                                  grade.id.includes(cs.gradedIngredientId),
                                )
                                .map((filteredName) => {
                                  return (
                                    <Rate
                                      style={{ width: '100%' }}
                                      disabled
                                      defaultValue={gradeToInt(
                                        filteredName.grade,
                                      )}
                                    />
                                  );
                                });
                            }
                          });
                        }
                      })}
                    </Paragraph>
                  </Card>
                </IngredientsContainer>
              </Space>
            );
          })}
        </IngredientsContainer>
      )}
    </>
  );
};

export default Ingredients;
