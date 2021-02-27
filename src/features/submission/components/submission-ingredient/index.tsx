import { Image, Skeleton, Typography } from 'antd';
import React from 'react';
import { IngredientWrapper, StyledCard, StyledCardGrid, SubmittedIngredientWrapper } from './styled';
import { SongIngredient } from '../../types';

const SubmissionIngredient = ({
  songIngredient,
  loading,
  setIsSubmitting,
  setCurrentSongIngredient,
}: {
  songIngredient: SongIngredient;
  loading: boolean;
  setIsSubmitting: Function;
  setCurrentSongIngredient: Function;
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
            setCurrentSongIngredient(songIngredient);
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <Skeleton active loading={loading}>
        <StyledCardGrid hoverable={false}>
          <Typography.Text strong>{songIngredient.song.name}</Typography.Text>
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <Image src={songIngredient.song.imageUrl} />
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          {!songIngredient.submitted ? (
            <IngredientWrapper>
              <Image src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image128}`} />
            </IngredientWrapper>
          ) : (
            <SubmittedIngredientWrapper>
              <Image src={`${process.env.ASSETS_URL}${songIngredient.ingredient.image128}`} />
            </SubmittedIngredientWrapper>
          )}
          <Typography.Text strong>{songIngredient.ingredient.name}</Typography.Text>
        </StyledCardGrid>
      </Skeleton>
    </StyledCard>
  );
};

export default SubmissionIngredient;
