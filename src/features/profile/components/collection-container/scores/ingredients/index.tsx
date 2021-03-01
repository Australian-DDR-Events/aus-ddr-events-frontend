import React, { useContext, useState, useEffect } from 'react';
import { Image, Table, Rate } from 'antd';
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
  const [ingredients, setIngredients] = useState(
    Array(12).fill(DefaultIngredient),
  );
  const [currentIngredient, setCurrentIngredient] = useState(DefaultIngredient);
  const [scores, setScores] = useState(Array(DefaultScore));
  const [currentScore, setCurrentScore] = useState(
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
          setCurrentIngredient(ingredientsRes.okOrDefault());
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
    if (currentIngredient || dancer || loading) {
      scoresRepo.scoresRepositoryInstance
        .getAll({ dancerId: dancer.id, songId: currentIngredient.songId })
        .then((scoresRes) => {
          setScores(scoresRes.okOrDefault());
          setLoading(false);
        });
    }
  }, [dancer, currentIngredient]);

  useEffect(() => {
    if (dancer || loading) {
      scoresRepo.scoresRepositoryInstance
        .getSummer2021ByDancer(dancer.id)
        .then((scoresRes) => {
          setCurrentScore(scoresRes.okOrDefault());
          setLoading(false);
        });
    }
  }, [dancer]);

  useEffect(() => {
    if (ingredients || loading) {
      ingredientsRepo.ingredientsRepositoryInstance
        .getGrades()
        .then((gradesRes) => {
          setGrades(gradesRes.okOrDefault());
          setLoading(false);
        });
    }
  }, [currentIngredient]);

  console.log(currentIngredient.id);
  console.log(grades);

  /* const gradeToInt = (grade: string) => {
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
  }; */

  return (
    <>
      {!loading && (
        <>
          <Table
            bordered
            size="middle"
            scroll={{ x: 80, y: 300 }}
            pagination={false}
            dataSource={ingredients.map(
              (ingredient: {
                id: any;
                name: any;
                image128: any;
                songId: any;
                songScore: any;
              }) => ({
                ingredientId: ingredient.id,
                ingredientName: ingredient.name,
                ingredientImageUrl: ingredient.image128,
                ingredientGrade: currentScore.map((cs) => {
                  grades.map((g) => {
                    if (cs.gradedIngredientId === g.id) return g.grade;
                  });
                }),

                songId: ingredient.songId,
                songScore: scores.map((score) => {
                  if (ingredient.songId === score.songId) {
                    return score.value;
                  }
                }),
              }),
            )}
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
              width={32}
              title="Ingredient Name"
              key="exscore"
              dataIndex="ingredientName"
            />
            <Column
              width={32}
              title="Quality"
              key="exscore"
              dataIndex="ingredientGrade"
              /* render={(q) => (
                <>
                <Rate disabled defaultValue={gradeToInt(i.currentGrade.grade)} />
                </>
              )} */
            />
            <Column
              width={32}
              title="Scores"
              key="exscore"
              dataIndex="songScore"
            />
          </Table>
        </>
      )}
    </>
  );
};

export default Ingredients;
