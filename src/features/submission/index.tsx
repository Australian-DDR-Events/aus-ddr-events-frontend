import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  Rate,
  Result,
  Row,
  Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultGrade, DefaultIngredient } from 'context/ingredients/constants';
import { DefaultSong } from 'context/songs/constants';
import SubmissionForm from './components/submission-form';
import SubmissionIngredient from './components/submission-ingredient';
import { SubmissionFormWrapper, SubmissionWrapper } from './styled';

const Submission = () => {
  const ingredientsRepository = useContext(IngredientsRepositoryContext);

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(DefaultIngredient);
  const [ingredients, setIngredients] = useState(
    Array(12).fill(DefaultIngredient),
  );
  const [currentSong, setCurrentSong] = useState(DefaultSong);
  const [currentGrade, setCurrentGrade] = useState(DefaultGrade);
  const [loading, setLoading] = useState(true);

  const onSubmit = async () => {
    const values = await form.validateFields();
    form.resetFields();
    setSending(true);
    const gradeResponse = await ingredientsRepository.ingredientsRepositoryInstance.postScoreSubmission(
      currentIngredient.id,
      {
        ...values,
        songId: currentSong.id,
      },
    );
    const grades = await ingredientsRepository.ingredientsRepositoryInstance.getGrades(
      currentIngredient.id,
    );

    grades.okOrDefault().every((grade) => {
      if (grade.id === gradeResponse.okOrDefault().gradedIngredientId) {
        setCurrentGrade(grade);
        return false;
      }
      return true;
    });
    setSubmitted(true);
    setSending(false);
  };

  const gradeToInt = (grade: string) => {
    if (grade === 'E') {
      return 1;
    }
    if (grade === 'B') {
      return 2;
    }
    if (grade === 'A') {
      return 3;
    }
    if (grade === 'AA') {
      return 4;
    }
    if (grade === 'AAA') {
      return 5;
    }
    return 0;
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
        title={`Obtain ${currentIngredient.name} by playing "${currentSong.name}"`}
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
              loading={sending}
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
            icon={
              <>
                <Image
                  src={`${process.env.ASSETS_URL}${currentIngredient.image128}`}
                />
                <br />
                <Rate disabled defaultValue={gradeToInt(currentGrade.grade)} />
              </>
            }
            status="success"
            title="Congratulations!"
            subTitle={`You have obtained ${currentGrade.description} ${currentIngredient.name}!`}
          />
        )}
      </Modal>
    </SubmissionWrapper>
  );
};

export default Submission;
