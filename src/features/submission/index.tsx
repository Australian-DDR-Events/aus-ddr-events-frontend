import { Button, Col, Form, Image, Modal, Result, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import SubmissionForm from './components/submission-form';
import SubmissionSong from './components/submission-song';
import { SubmissionFormWrapper, SubmissionWrapper } from './styled';
import { SongsRepositoryContext } from 'context/songs';
import { ScoresRepositoryContext } from 'context/scores';
import { DefaultSong } from 'context/songs/constants';

const Submission = () => {
  const songsRepository = useContext(SongsRepositoryContext);
  const scoresRepository = useContext(ScoresRepositoryContext);

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSong, setCurrentSong] = useState(DefaultSong);
  const [songs, setSongs] = useState(Array(12).fill(DefaultSong));
  const [loading, setLoading] = useState(true);

  const onSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
    const response = await scoresRepository.scoresRepositoryInstance.postScore({
      ...values,
      songId: currentSong.id,
    })
    console.log(response);
    // Still need to retrieve ingredient score
    setSubmitted(true);
  };

  useEffect(() => {
    if (loading) {
      songsRepository.songsRepositoryInstance.getAll().then((songs) => {
        setSongs(songs.okOrDefault());
        setLoading(false);
      });
    }
  }, [submitted]);

  return (
    <SubmissionWrapper>
      <Typography.Title level={2}>Individual Song Submission</Typography.Title>
      <Row
        gutter={[
          { xs: 16, xl: 48 },
          { xs: 16, xl: 24 },
        ]}
      >
        {songs.map((song) => {
          return (
            <Col xs={12} xl={4} className="gutter-row">
              <SubmissionSong
                song={song}
                loading={loading}
                setIsSubmitting={setIsSubmitting}
                setCurrentSong={setCurrentSong}
              />
            </Col>
          );
        })}
      </Row>
      <Modal
        title={currentSong.name}
        visible={isSubmitting}
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
          <SubmissionFormWrapper>
            <Image src={currentSong.imageUrl} />
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
