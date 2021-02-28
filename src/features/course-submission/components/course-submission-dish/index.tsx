import { Card, Image, Typography } from "antd";
import React from "react";
import { Recipe } from "../../types";

const CourseSubmissionDish = ({
  recipe,
  setIsSubmitting,
  setCurrentRecipe,
}: {
  recipe: Recipe;
  setIsSubmitting: Function;
  setCurrentRecipe: Function;
}) => {
  return (
    <Card
      actions={[
        <Typography.Link
          strong
          onClick={() => {
            setIsSubmitting(true);
            setCurrentRecipe(recipe);
          }}
        >
          Cook Dish
        </Typography.Link>,
      ]}
    >
      <Card.Grid style={{ width: '100%' }}>
        {recipe.dish.name}
      </Card.Grid>
      <Card.Grid style={{ width: '100%' }}>
        <Image src={"https://i.imgur.com/ChYOL3K.png"} />
      </Card.Grid>
    </Card>
  )
}

export default CourseSubmissionDish;