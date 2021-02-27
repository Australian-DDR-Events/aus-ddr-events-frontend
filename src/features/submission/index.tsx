import {
  Button,
  Col,
  Form,
  Image,
  Modal,
  Rate,
  Result,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { DefaultGrade } from 'context/ingredients/constants';
import { DefaultSong } from 'context/songs/constants';
import { SongsRepositoryContext } from 'context/songs';
import { ScoresRepositoryContext } from 'context/scores';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DancersRepositoryContext } from 'context/dancer';
import SubmissionForm from './components/submission-form';
import SubmissionIngredient from './components/submission-ingredient';
import {
  ChallengeJacket,
  ExpertJacket,
  SubmissionFormWrapper,
  SubmissionWrapper,
} from './styled';
import { SongIngredient } from './types';
import { DefaultSongIngredient } from './constants';

const Submission = () => {
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
  const scoresRepository = useContext(ScoresRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);
  const dancersRepository = useContext(DancersRepositoryContext);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [songIngredients, setSongIngredients] = useState(
    new Array<SongIngredient>(),
  );
  const [currentSongIngredient, setCurrentSongIngredient] = useState(
    DefaultSongIngredient,
  );
  const [currentGrade, setCurrentGrade] = useState(DefaultGrade);
  const [loading, setLoading] = useState(true);

  const songIngredientMap = new Map<string, SongIngredient>();

  const onSubmit = async () => {
    const values = await form.validateFields();
    form.resetFields();
    setSending(true);
    const gradeResponse = await ingredientsRepository.ingredientsRepositoryInstance.postScoreSubmission(
      currentSongIngredient.ingredient.id,
      {
        ...values,
        songId: currentSongIngredient.song.id,
      },
    );
    const grades = await ingredientsRepository.ingredientsRepositoryInstance.getGrades(
      currentSongIngredient.ingredient.id,
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
    const asyncFetch = async () => {
      // Get all ingredients
      const ingredientsRes = await ingredientsRepository.ingredientsRepositoryInstance.getAll();
      ingredientsRes.okOrDefault().forEach((ingredient) => {
        songIngredientMap.set(ingredient.songId, {
          ingredient,
          song: DefaultSong,
          submitted: false,
        });
      });
      // Attach corresponding songs to ingredients
      const songsRes = await songsRepository.songsRepositoryInstance.getAll();
      songsRes.okOrDefault().forEach((song) => {
        const songIngredient = songIngredientMap.get(song.id);
        if (songIngredient) {
          songIngredient.song = song;
        }
      });
      const dancerRes = await dancersRepository.dancersRepositoryInstance.get(
        loggedInUser.id,
      );
      // Find existing scores for ingredients
      const scoresRes = await scoresRepository.scoresRepositoryInstance.getAll({
        dancerId: [dancerRes.okOrDefault().id],
        songId: [],
      });
      scoresRes.okOrDefault().forEach((score) => {
        const songIngredient = songIngredientMap.get(score.songId);
        if (songIngredient) {
          songIngredient.submitted = true;
        }
      });

      setSongIngredients(Array.from(songIngredientMap.values()));
      setLoading(false);
    };

    asyncFetch();
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
        <Skeleton active loading={loading}>
          {songIngredients.map((songIngredient) => {
            return (
              <Col xs={12} xl={4} className="gutter-row">
                <SubmissionIngredient
                  songIngredient={songIngredient}
                  loading={loading}
                  setIsSubmitting={setIsSubmitting}
                  setCurrentSongIngredient={setCurrentSongIngredient}
                />
              </Col>
            );
          })}
        </Skeleton>
      </Row>
      <Modal
        title={`Obtain ${currentSongIngredient.ingredient.name} by playing "${currentSongIngredient.song.name}" on ${currentSongIngredient.song.difficulty}`}
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
            {currentSongIngredient.song.difficulty === 'Expert' ? (
              <ExpertJacket src={currentSongIngredient.song.imageUrl} />
            ) : (
              <ChallengeJacket src={currentSongIngredient.song.imageUrl} />
            )}
            <SubmissionForm form={form} />
          </SubmissionFormWrapper>
        ) : (
          <Result
            icon={
              <>
                <Image
                  src={`${process.env.ASSETS_URL}${currentSongIngredient.ingredient.image128}`}
                />
                <br />
                <Rate disabled defaultValue={gradeToInt(currentGrade.grade)} />
              </>
            }
            status="success"
            title="Congratulations!"
            subTitle={`You have obtained ${currentGrade.description} ${currentSongIngredient.ingredient.name}!`}
          />
        )}
      </Modal>
    </SubmissionWrapper>
  );
};

export default Submission;
