import { Button, Col, Form, Image, Modal, Result, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultIngredient } from 'context/ingredients/constants';
import { ScoresRepositoryContext } from 'context/scores';
import SubmissionForm from './components/submission-form';
import SubmissionIngredient from './components/submission-ingredient';
import { SubmissionFormWrapper, SubmissionWrapper } from './styled';
import { DefaultSong } from 'context/songs/constants';

const Submission = () => {
  const ingredientsRepository = useContext(IngredientsRepositoryContext);

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(DefaultIngredient);
  const [ingredients, setIngredients] = useState(
    Array(12).fill(DefaultIngredient),
  );
  const [currentSong, setCurrentSong] = useState(DefaultSong);
  const [loading, setLoading] = useState(true);

  const onSubmit = async () => {
    // const values = await form.validateFields();
    // console.log(values);
    // const response = await scoresRepository.scoresRepositoryInstance.postScore({
    //   ...values,
    //   songId: currentSong.id,
    // })
    // console.log(response);
    // // Still need to retrieve ingredient score
    // setSubmitted(true);
  };

  useEffect(() => {
    if (loading) {
      ingredientsRepository.ingredientsRepositoryInstance
        .getAll()
        .then((ingredientsRes) => {
          setIngredients(ingredientsRes.okOrDefault());
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
        {ingredients.map((ingredient) => {
          return (
            <Col xs={12} xl={4} className="gutter-row">
              <SubmissionIngredient
                ingredient={ingredient}
                loading={loading}
                setIsSubmitting={setIsSubmitting}
                setCurrentIngredient={setCurrentIngredient}
                setCurrentSong={setCurrentSong}
              />
            </Col>
          );
        })}
      </Row>
      <Modal
        title={`Obtain ${currentIngredient.name} by playing "${currentIngredient.name}"`}
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
            <Image src={currentIngredient.image128} />
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
