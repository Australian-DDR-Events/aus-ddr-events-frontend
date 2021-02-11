import { Image, Skeleton, Typography } from 'antd';
import React from 'react';
import { Song } from 'context/songs/types';
import { IngredientWrapper, StyledCard, StyledCardGrid } from './styled';

const SubmissionSong = ({
  song,
  loading,
  setIsSubmitting,
  setCurrentSong,
}: {
  song: Song;
  loading: boolean;
  setIsSubmitting: Function;
  setCurrentSong: Function;
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
            setCurrentSong(song);
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <Skeleton loading={loading}>
        <StyledCardGrid hoverable={false}>
          <Typography.Text strong>{song.name}</Typography.Text>
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <Image src={song.imageUrl} />
        </StyledCardGrid>
        <StyledCardGrid hoverable={false}>
          <IngredientWrapper>
            <Image src="https://i.imgur.com/woOvNJ0.png" />
          </IngredientWrapper>
          <Typography.Text strong>Bread</Typography.Text>
        </StyledCardGrid>
      </Skeleton>
    </StyledCard>
  );
};

export default SubmissionSong;
