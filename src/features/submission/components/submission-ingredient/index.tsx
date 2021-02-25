import { Image, Skeleton, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Ingredient } from 'context/ingredients/types';
import { IngredientWrapper, StyledCard, StyledCardGrid } from './styled';
import { SongsRepositoryContext } from 'context/songs';
import { DefaultSong } from 'context/songs/constants';

const SubmissionIngredient = ({
  ingredient,
  loading,
  setIsSubmitting,
  setCurrentIngredient,
  setCurrentSong,
}: {
  ingredient: Ingredient;
  loading: boolean;
  setIsSubmitting: Function;
  setCurrentIngredient: Function;
  setCurrentSong: Function;
}) => {
  const songsRepository = useContext(SongsRepositoryContext);

  const [jacketLoading, setJacketLoading] = useState(true);
  const [song, setSong] = useState(DefaultSong)

  useEffect(() => {
    if (jacketLoading) {
      songsRepository.songsRepositoryInstance
        .getById(ingredient.songId)
        .then((songRes) => {
          setSong(songRes.okOrDefault);
          setJacketLoading(false);
        })
    }
  });

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
            setCurrentSong(song)
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <Skeleton loading={loading}>
        <StyledCardGrid hoverable={false}>
          <Typography.Text strong>{ingredient.name}</Typography.Text>
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          {jacketLoading ? (
            <Skeleton.Image />
          ) : (
            <Image src={ingredient.image128} />
          )}
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <IngredientWrapper>
            <Image src={`${process.env.ASSETS_URL}${ingredient.image128}`} />
          </IngredientWrapper>
          <Typography.Text strong>{ingredient.name}</Typography.Text>
        </StyledCardGrid>
      </Skeleton>
    </StyledCard>
  );
};

export default SubmissionIngredient;
