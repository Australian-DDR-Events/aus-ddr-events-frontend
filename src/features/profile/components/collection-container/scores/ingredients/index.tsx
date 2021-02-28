import React, { useContext, useState, useEffect } from 'react';
import { Image, Table } from 'antd';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultIngredient } from 'context/ingredients/constants';
import { DefaultScore } from 'context/scores/constants';
import { ScoresRepositoryContext } from 'context/scores';
import { AuthenticationRepositoryContext } from 'context/authentication';

const { Column } = Table;

const Ingredients = () => {
  const ingredientsRepo = useContext(IngredientsRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const scoresRepo = useContext(ScoresRepositoryContext);
  const [ingredients, setIngredients] = useState(
    Array(12).fill(DefaultIngredient),
  );
  const [scores, setScores] = useState(DefaultScore);
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

      scoresRepo.scoresRepositoryInstance
        .getAll({ dancerId: loggedInUserId })
        .then((scoresRes) => {
          setScores(scoresRes.okOrDefault());
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      {!loading && (
        <Table
          bordered
          size="middle"
          scroll={{ x: 80, y: 300 }}
          pagination={false}
          dataSource={ingredients.map((ingredient) => ({
            ingredientId: ingredient.id,
            ingredientName: ingredient.name,
            ingredientImageUrl: ingredient.image128,
            songId: ingredient.songId,
            songScore: scores,
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
            width={32}
            title="Ingredient Name"
            key="exscore"
            dataIndex="ingredientName"
          />
          <Column
            width={32}
            title="Quality"
            key="exscore"
            dataIndex="ingredientId"
          />
          <Column
            width={32}
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
