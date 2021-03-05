import { Card, Carousel, FormInstance, Image, message, Typography } from 'antd';
import React from 'react';
import { ChallengeJacket, ExpertJacket } from '../../styled';
import { DetailedDishSong, Recipe } from '../../types';
import { StyledCard, StyledUnsubmitted } from './styled';

const CourseSubmissionDish = ({
  recipe,
  form,
  setIsSubmitting,
  setCurrentRecipe,
}: {
  recipe: Recipe;
  form: FormInstance;
  setIsSubmitting: Function;
  setCurrentRecipe: Function;
}) => {
  const allSubmitted = (songs: Array<DetailedDishSong>) => {
    let submitted = true;
    songs.forEach((song) => {
      submitted = submitted && song.submitted;
    });
    return submitted;
  };

  return (
    <StyledCard
      actions={[
        <Typography.Link
          strong
          onClick={() => {
            let cookable = true;
            recipe.songIngredients.forEach((songIngredient) => {
              cookable = cookable && songIngredient.submitted;
            });
            if (cookable) {
              setCurrentRecipe(recipe);
              form.resetFields();
              setIsSubmitting(true);
            } else {
              message.error('Ingredients still missing!');
            }
          }}
        >
          Cook Dish
        </Typography.Link>,
      ]}
    >
      <Card.Grid hoverable={false} style={{ width: '100%' }}>
        <Typography.Text strong>{recipe.dish.name}</Typography.Text>
      </Card.Grid>
      <Card.Grid hoverable={false} style={{ width: '100%' }}>
        {allSubmitted(recipe.songs) ? (
          <Image
            src={`${process.env.ASSETS_URL}${recipe.dish.image128}`}
            preview={false}
          />
        ) : (
          <StyledUnsubmitted
            src={`${process.env.ASSETS_URL}${recipe.dish.image128}`}
            preview={false}
          />
        )}
      </Card.Grid>
      <Card.Grid hoverable={false} style={{ width: '100%' }}>
        <Carousel autoplay draggable>
          {recipe.songs.map((song) => {
            if (song.songDetails.difficulty === 'Expert') {
              return (
                <ExpertJacket
                  src={`${process.env.ASSETS_URL}${song.songDetails.image256}`}
                  preview={false}
                />
              );
            }
            return (
              <ChallengeJacket
                src={`${process.env.ASSETS_URL}${song.songDetails.image256}`}
                preview={false}
              />
            );
          })}
        </Carousel>
      </Card.Grid>
      {recipe.songIngredients.map((songIngredient) => {
        return (
          <Card.Grid hoverable={false} style={{ width: '25%', padding: '8px' }}>
            {songIngredient.submitted ? (
              <Image
                src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image64}`}
                preview={false}
              />
            ) : (
              <StyledUnsubmitted
                src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image64}`}
                preview={false}
              />
            )}
          </Card.Grid>
        );
      })}
    </StyledCard>
  );
};

export default CourseSubmissionDish;
