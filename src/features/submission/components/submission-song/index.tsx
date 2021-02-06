import { Image, Typography } from 'antd';
import React from 'react';
import { IngredientWrapper, StyledCard, StyledCardGrid } from './styled';

const SubmissionSong = ({
  title,
  setIsSubmitting,
  setCurrentSong,
}: {
  title: string;
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
            setCurrentSong(title);
            setIsSubmitting(true);
          }}
        >
          Submit
        </Typography.Link>,
      ]}
    >
      <StyledCardGrid hoverable={false}>
        <Typography.Text strong>{title}</Typography.Text>
      </StyledCardGrid>
      <StyledCardGrid hoverable={false}>
        <Image src="https://i.imgur.com/QgffZNl.png" />
      </StyledCardGrid>
      <StyledCardGrid hoverable={false}>
        <IngredientWrapper>
          <Image src="https://i.imgur.com/woOvNJ0.png" />
        </IngredientWrapper>
        <Typography.Text strong>Bread</Typography.Text>
      </StyledCardGrid>
    </StyledCard>
  );
};

export default SubmissionSong;
