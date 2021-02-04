import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Image, Typography } from "antd";
import React from "react";
import { IngredientWrapper } from "./styled";

const SubmissionSong = ({
  title,
}: {
  title: string;
}) => {
  return (
    <Card
      actions={[
        <Typography.Title level={5}>Submit</Typography.Title>
      ]}
    >
      <Card.Grid>
        <Typography.Text strong>{title}</Typography.Text>
      </Card.Grid>
      <Card.Grid hoverable={false}>
        <Image src="https://i.imgur.com/QgffZNl.png" />
      </Card.Grid>
      <Card.Grid hoverable={false}>
        <IngredientWrapper>
          <Image src="https://i.imgur.com/woOvNJ0.png" />
        </IngredientWrapper>
        <Typography.Text strong>Bread</Typography.Text>
      </Card.Grid>
    </Card>
  );
}

export default SubmissionSong;