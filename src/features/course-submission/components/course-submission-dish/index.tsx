import { Card, Carousel, FormInstance, Image, message, Typography } from "antd";
import React from "react";
import { Recipe } from "../../types";
import { StyledCard, StyledIngredient } from "./styled";

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
  return (
    <StyledCard
      actions={[
        <Typography.Link
          strong
          onClick={() => {
            let cookable = true;
            recipe.songIngredients.forEach((songIngredient) => {
              cookable = cookable && songIngredient.submitted;
            })
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
      <Card.Grid style={{ width: '100%' }}>
        <Typography.Text strong>{recipe.dish.name}</Typography.Text>
      </Card.Grid>
      <Card.Grid style={{ width: '100%' }}>
        <Image src={`${process.env.ASSETS_URL}${recipe.dish.image128}`} />
      </Card.Grid>
      <Card.Grid style={{ width: '100%' }}>
        <Carousel autoplay>
          {recipe.songs.map((song) => {
            return <Image src={song.songDetails.imageUrl} />
          })}
        </Carousel>
      </Card.Grid>
      {recipe.songIngredients.map((songIngredient) => {
        return (
          <Card.Grid style = {{ width: '25%', padding: '8px' }}>
            {songIngredient.submitted ? (
              <Image src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image128}`} />
            ) : (
              <StyledIngredient src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image128}`} />
            )}
          </Card.Grid>
        );
      })}
    </StyledCard>
  )
}

export default CourseSubmissionDish;