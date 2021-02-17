import { Image, Skeleton, Typography } from 'antd';
import React from 'react';
import { Song } from 'context/songs/types';
import { Ingredient } from 'context/ingredients/types';
import { IngredientWrapper, StyledCard, StyledCardGrid } from './styled';

const SubmissionIngredient = ({
  ingredient,
  loading,
  setIsSubmitting,
  setCurrentIngredient,
}: {
  ingredient: Ingredient;
  loading: boolean;
  setIsSubmitting: Function;
  setCurrentIngredient: Function;
}) => {
  return (
    <StyledCard
      bodyStyle={{
        margin: '-1px 0 0 -1px',
        padding: '0',
        border: '0',
      }}
      actions={[
        <Typography.Link
          strong
          onClick={() => {
            setCurrentIngredient(ingredient);
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <Skeleton loading={loading}>
        <StyledCardGrid hoverable={false}>
          <Typography.Text strong>{ingredient.song.name}</Typography.Text>
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <Image src={ingredient.song.imageUrl} />
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <IngredientWrapper>
            <Image src={`${process.env.AWS_URL}/Summer2021/Ingredients/${ingredient.id}.png`} />
          </IngredientWrapper>
          <Typography.Text strong>{ingredient.name}</Typography.Text>
        </StyledCardGrid>
      </Skeleton>
    </StyledCard>
  );
};

export default SubmissionIngredient;
