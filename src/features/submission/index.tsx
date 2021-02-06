import { Button, Col, Form, Image, Modal, Result, Row, Typography } from 'antd';
import React, { useState } from 'react';
import SubmissionForm from './components/submission-form';
import SubmissionSong from './components/submission-song';
import { SubmissionFormWrapper, SubmissionWrapper } from './styled';

const Submission = () => {
  const songs = [
    "BURNIN' THE FLOOR",
    'Holic',
    'Heron',
    'Eternal Summer',
    'RIGHT ON TIME',
    'Pierce The Sky',
    'nightbird lost wing',
    'PRANA',
    'out of focus',
    'Magnetic',
    'Cosy Catastrophe',
  ];

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSong, setCurrentSong] = useState('');

  const onSubmit = () => {
    form.validateFields().then(() => {
      setSubmitted(true);
    });
  };

  return (
    <SubmissionWrapper>
      <Typography.Title level={2}>Individual Song Submission</Typography.Title>
      <Row
        gutter={[
          { xs: 16, xl: 48 },
          { xs: 16, xl: 24 },
        ]}
      >
        {songs.map((title) => {
          return (
            <Col xs={12} xl={4} className="gutter-row">
              <SubmissionSong
                title={title}
                setIsSubmitting={setIsSubmitting}
                setCurrentSong={setCurrentSong}
              />
            </Col>
          );
        })}
      </Row>
      <Modal
        title={currentSong}
        visible={isSubmitting}
        onCancel={() => {
          setIsSubmitting(false);
          setSubmitted(false);
        }}
        footer={
          !submitted
            ? [
                <Button
                  key="submit"
                  type="primary"
                  loading={false}
                  onClick={onSubmit}
                >
                  Submit
                </Button>,
              ]
            : [null]
        }
      >
        {!submitted ? (
          <SubmissionFormWrapper>
            <Image src="https://i.imgur.com/QgffZNl.png" />
            <SubmissionForm form={form} />
          </SubmissionFormWrapper>
        ) : (
          <Result
            icon={<Image src="https://i.imgur.com/woOvNJ0.png" />}
            status="success"
            title="Congratulations!"
            subTitle="You have obtained 5-star bread!"
          />
        )}
      </Modal>
    </SubmissionWrapper>
  );
};

export default Submission;
