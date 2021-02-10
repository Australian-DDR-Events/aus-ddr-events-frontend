import { Col, Row, Typography } from "antd";
import React from "react";
import CourseSubmissionDish from "./components/course-submission-dish";
import { CourseSubmissionWrapper } from "./styled";

const CourseSubmission = () => {
  const dishes = [
    "Sausage in Bread",
    "Fish and Chips",
    "Green Salad",
    "Seafood Platter",
    "Steak and Chips",
    "Beef Burger",
    "Fish Burger",
    "Veggie Burger",
    "Chicken Skewers",
    "Garlic Prawns",
  ]
  
  return (
    <CourseSubmissionWrapper>
      <Typography.Title level={2}>Stamina Course Submission</Typography.Title>
      <Row
        gutter={[
          { xs: 0, xl: 48 },
          { xs: 0, xl: 24 },
        ]}
      >
        {dishes.map((dish) => {
          return (
            <Col xs={24} xl={6} className="gutter-row">
              <CourseSubmissionDish
                dish={dish}
              />
            </Col>
          )
        })

        }
      </Row>
    </CourseSubmissionWrapper>
  )
}

export default CourseSubmission;