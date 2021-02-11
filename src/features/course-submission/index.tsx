import { Button, Col, Form, Image, Modal, Result, Row, Typography } from "antd";
import React, { useState } from "react";
import CourseSubmissionDish from "./components/course-submission-dish";
import CourseSubmissionForm from "./components/course-submission-form";
import { CourseSubmissionFormWrapper, CourseSubmissionWrapper } from "./styled";

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

  const [form] = Form.useForm();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCourse, setCurrentCourse] = useState('');

  const onSubmit = () => {
    console.log("submitted");
  }
  
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
                setIsSubmitting={setIsSubmitting}
                setCurrentCourse={setCurrentCourse}
              />
            </Col>
          )
        })

        }
      </Row>
      <Modal
        title={currentCourse}
        visible={isSubmitting}
        width={720}
        onCancel={() => {
          setIsSubmitting(false);
          setSubmitted(false);
        }}
        footer={
          !submitted && (
            <Button
              key="submit"
              type="primary"
              loading={false}
              onClick={onSubmit}
            >
              Submit
            </Button>
          )
        }
      >
        {!submitted ? (
          <CourseSubmissionFormWrapper>
            <Image
              src={"https://i.imgur.com/ChYOL3K.png"}
              width={240}
            />
            <CourseSubmissionForm form={form} />
          </CourseSubmissionFormWrapper>
        ) : (
          <Result 
            icon={<Image src="https://i.imgur.com/woOvNJ0.png" />}
            status="success"
            title="Congratulations!"
            subTitle={`You have obtained 5-star ${currentCourse}!`}
          />
        )}
      </Modal>
    </CourseSubmissionWrapper>
  )
}

export default CourseSubmission;