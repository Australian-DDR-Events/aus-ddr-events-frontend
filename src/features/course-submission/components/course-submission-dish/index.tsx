import { Card, Image, Typography } from "antd";
import React from "react";

const CourseSubmissionDish = ({
  dish,
  setIsSubmitting,
  setCurrentCourse,
}: {
  dish: string;
  setIsSubmitting: Function;
  setCurrentCourse: Function;
}) => {
  return (
    <Card
      actions={[
        <Typography.Link
          strong
          onClick={() => {
            setIsSubmitting(true);
            setCurrentCourse(dish);
          }}
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