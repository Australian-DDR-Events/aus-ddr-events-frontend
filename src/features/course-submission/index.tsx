import { Button, Col, Form, Image, Modal, Rate, Result, Row, Skeleton, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CourseSubmissionDish from "./components/course-submission-dish";
import CourseSubmissionForm from "./components/course-submission-form";
import { CourseSubmissionFormWrapper, CourseSubmissionWrapper } from "./styled";
import { DetailedDishSong, Recipe } from "./types";
import { SongIngredient } from "../submission/types";
import { DishesRepositoryContext } from "context/dishes";
import { DefaultSong } from "context/songs/constants";
import { SongsRepositoryContext } from "context/songs";
import { DancersRepositoryContext } from "context/dancer";
import { ScoresRepositoryContext } from "context/scores";
import { AuthenticationRepositoryContext } from "context/authentication";
import { DefaultDetailedDishSong, DefaultRecipe } from "./constants";
import { DefaultSongIngredient } from "../submission/constants";
import { DefaultDishGrade } from "context/dishes/constants";
import { DishSubmissionRequest } from "~/context/dishes/types";

const CourseSubmission = () => {
  const dishesRepository = useContext(DishesRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
  const dancersRepository = useContext(DancersRepositoryContext);
  const scoresRepository = useContext(ScoresRepositoryContext);
  const authRepo = useContext(AuthenticationRepositoryContext);

  const loggedInUser = authRepo.authenticationRepositoryInstance
    .get()
    .okOrDefault();

  const [form] = Form.useForm();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(DefaultRecipe);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [recipes, setRecipes] = useState(new Array<Recipe>());
  const [currentGrade, setCurrentGrade] = useState(DefaultDishGrade);

  const dishRecipeMap = new Map<string, Recipe>();
  const songIngredientMap = new Map<string, SongIngredient>();
  const dishSongMap = new Map<string, DetailedDishSong>();

  const onSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
    setSending(true);

    const request: DishSubmissionRequest = {
      pairBonus: values.pairBonus,
      finalImage: values.finalImage,
      scores: [],
    };
    [0,1,2].forEach((index) => {
      request.scores.push({
        score: values[`score${index}`],
        scoreImage: values[`scoreImage${index}`],
        songId: values[`songId${index}`],
      })
    })

    const gradeResponse = await dishesRepository.dishesRepositoryInstance.postSubmission(
      currentRecipe.dish.id,
      {
        ...request,
      },
    );
    const grades = await dishesRepository.dishesRepositoryInstance.getGrades(
      currentRecipe.dish.id,
    );

    grades.okOrDefault().every((grade) => {
      if (grade.id === gradeResponse.okOrDefault().gradedDishId) {
        setCurrentGrade(grade);
        return false;
      }
      return true;
    });

    form.resetFields();
    setSubmitted(true);
    setSending(false);
  }

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
      // Get all dishes
      const dishesRes = await dishesRepository.dishesRepositoryInstance.getAll();
      const promises = dishesRes.okOrDefault().map(async (dish) => {
        dishRecipeMap.set(dish.id, {
          dish: dish,
          songIngredients: new Array<SongIngredient>(),
          songs: new Array<DetailedDishSong>(),
        });
        // Get corresponding ingredients
        const ingredientsRes = await dishesRepository.dishesRepositoryInstance.getIngredients(dish.id);
        ingredientsRes.okOrDefault().forEach((ingredient) => {
          if (songIngredientMap.get(ingredient.songId)) {
            const songIngredient = songIngredientMap.get(ingredient.songId);
            dishRecipeMap.get(dish.id)?.songIngredients.push(songIngredient || DefaultSongIngredient);
          } else {
            const songIngredient = {
              ingredient: ingredient,
              song: DefaultSong,
              submitted: false,
            };
            dishRecipeMap.get(dish.id)?.songIngredients.push(songIngredient);
            songIngredientMap.set(ingredient.songId, songIngredient);
          }
        });
        // Get corresponding dish songs
        const songsRes = await dishesRepository.dishesRepositoryInstance.getSongs(dish.id);
        songsRes.okOrDefault().forEach((dishSong) => {
          if (dishSongMap.get(dishSong.songId)) {
            const detailedDishSong = dishSongMap.get(dishSong.songId);
            dishRecipeMap.get(dish.id)?.songs.push(detailedDishSong || DefaultDetailedDishSong);
          } else {
            const detailedDishSong = {
              dishSong: dishSong,
              songDetails: DefaultSong,
            }
            dishRecipeMap.get(dish.id)?.songs.push(detailedDishSong);
            dishSongMap.set(dishSong.songId, detailedDishSong);
          }
        });
      });
      await Promise.all(promises);
      // Get dish song details
      const songsRes = await songsRepository.songsRepositoryInstance.getAll();
      songsRes.okOrDefault().forEach((songDetails) => {
        const detailedDishSong = dishSongMap.get(songDetails.id);
        if (detailedDishSong) {
          detailedDishSong.songDetails = songDetails;
        };
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
      
      setRecipes(Array.from(dishRecipeMap.values()));
      setLoading(false);
    }

    asyncFetch();
  }, [submitted]);
  
  return (
    <CourseSubmissionWrapper>
      <Typography.Title level={2}>Stamina Course Submission</Typography.Title>
      <Row
        gutter={[
          { xs: 16, xl: 48 },
          { xs: 16, xl: 24 },
        ]}
      >
        <Skeleton active loading={loading}>
          {recipes.map((recipe) => {
            return (
              <Col xs={24} xl={6} className="gutter-row">
                <CourseSubmissionDish
                  recipe={recipe}
                  form={form}
                  setIsSubmitting={setIsSubmitting}
                  setCurrentRecipe={setCurrentRecipe}
                />
              </Col>
            );
          })}
        </Skeleton>
      </Row>
      <Modal
        title={currentRecipe.dish.name}
        visible={isSubmitting}
        // width={720}
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
          <CourseSubmissionFormWrapper>
            <CourseSubmissionForm
              form={form}
              currentRecipe={currentRecipe}
            />
          </CourseSubmissionFormWrapper>
        ) : (
          <Result 
            icon={
              <>
                <Image
                  src={`${process.env.ASSETS_URL}${currentGrade.image128}`}
                />
                <br />
                <Rate disabled defaultValue={gradeToInt(currentGrade.grade)} />
              </>
            }
            status="success"
            title="Congratulations!"
            subTitle={`You have cooked ${currentGrade.description} ${currentRecipe.dish.name}!`}
          />
        )}
      </Modal>
    </CourseSubmissionWrapper>
  )
}

export default CourseSubmission;