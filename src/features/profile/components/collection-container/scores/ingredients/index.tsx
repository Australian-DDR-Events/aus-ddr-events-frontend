import React, { useContext, useState, useEffect } from 'react';
import { Image, Table } from 'antd';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultGrade, DefaultIngredient } from 'context/ingredients/constants';
import { DefaultScore, DefaultSummer2021Score } from 'context/scores/constants';
import { ScoresRepositoryContext } from 'context/scores';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DefaultDancer, DancersRepositoryContext } from 'context/dancer';

const { Column } = Table;

const Ingredients = () => {
  const ingredientsRepo = useContext(IngredientsRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const dancersRepo = useContext(DancersRepositoryContext);
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
      const gradesPromises = ingredients.map((ingredientId) =>
        ingredientsRepo.ingredientsRepositoryInstance.getGrades(
          ingredientId.id,
        ),
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

  return (
    <>
      {!loading && (
        <Table
          bordered
          size="middle"
          scroll={{ x: 80, y: 300 }}
          pagination={false}
          dataSource={ingredients.map((ingredient) => ({
            ingredientName: ingredient.name,
            ingredientImageUrl: ingredient.image128,
            songScore: scores.map((score) => {
              if (ingredient.songId === score.songId) {
                return score.value;
              }
            }),
            ingredientGrade: scores.map((score) => {
              if (ingredient.songId === score.songId) {
                return currentScores.map((cs) => {
                  if (score.id === cs.scoreId) {
                    return grades
                      .filter((grade) =>
                        grade.id.includes(cs.gradedIngredientId),
                      )
                      .map((filteredName) => {
                        return filteredName.description;
                      });
                  }
                });
              }
            }),
          }))}
        >
          <Column
            width={12}
            title="Ingredient"
            key="ingredient"
            render={(i) => (
              <>
                <Image
                  style={{ maxWidth: '40px' }}
                  src={`${process.env.ASSETS_URL}${i.ingredientImageUrl}`}
                  alt="ingredient image"
                />
              </>
            )}
          />

          <Column
            width={24}
            title="Ingredient Name"
            key="ingredientName"
            dataIndex="ingredientName"
          />
          <Column
            width={16}
            title="Quality"
            key="ingredientGrade"
            dataIndex="ingredientGrade"
          />
          <Column
            width={16}
            title="Scores"
            key="exscore"
            dataIndex="songScore"
          />
        </Table>
      )}
    </>
  );
};

export default Ingredients;
