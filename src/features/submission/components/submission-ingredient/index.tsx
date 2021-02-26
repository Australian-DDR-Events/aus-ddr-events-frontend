import { Image, Skeleton, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Ingredient } from 'context/ingredients/types';
import { SongsRepositoryContext } from 'context/songs';
import { DefaultSong } from 'context/songs/constants';
import { IngredientWrapper, StyledCard, StyledCardGrid } from './styled';

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
  const [song, setSong] = useState(DefaultSong);

  useEffect(() => {
    if (jacketLoading && ingredient.id) {
      songsRepository.songsRepositoryInstance
        .getById(ingredient.songId)
        .then((songRes) => {
          setSong(songRes.okOrDefault);
          setJacketLoading(false);
        });
    }
  }, [ingredient, jacketLoading]);

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
            setCurrentSong(song);
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <Skeleton active loading={loading}>
        <StyledCardGrid hoverable={false}>
          <Typography.Text strong>{song.name}</Typography.Text>
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          {jacketLoading ? <Skeleton.Image /> : <Image src={song.imageUrl} />}
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
