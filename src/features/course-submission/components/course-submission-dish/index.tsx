import { Card, Image, Typography } from "antd";
import React from "react";

const CourseSubmissionDish = ({ dish }: { dish: string }) => {
  return (
    <Card
      actions={[
        <Typography.Link
          strong
        >
          Cook Dish
        </Typography.Link>,
      ]}
    >
      <Card.Grid style={{ width: '100%' }}>
        {dish}
      </Card.Grid>
      <Card.Grid style={{ width: '100%' }}>
        <Image src={"https://i.imgur.com/ChYOL3K.png"} />
      </Card.Grid>
    </Card>
  )
}

export default CourseSubmissionDish;