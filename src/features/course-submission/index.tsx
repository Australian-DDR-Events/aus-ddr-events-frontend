import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { AuthenticationRepositoryContext } from 'context/authentication';
import { DancersRepositoryContext } from 'context/dancer';
import { DishesRepositoryContext } from 'context/dishes';
import { IngredientsRepositoryContext } from 'context/ingredients';
import React, { useContext, useEffect, useState } from 'react';
import { defaultPixel } from 'types/styled';
import { DancerGradedIngredient, Dish } from 'types/summer2021';

import DishDisplay from './dish-display';

const CourseSubmission = () => {
  const authRepo = useContext(AuthenticationRepositoryContext);
  const dancerRepo = useContext(DancersRepositoryContext);
  const dishesRepo = useContext(DishesRepositoryContext);
  const ingredientsRepo = useContext(IngredientsRepositoryContext);
  const [dishes, setDishes] = useState<Dish[]>();
  const [dancerIngredients, setDancerIngredients] = useState<
    Map<string, DancerGradedIngredient>
  >();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();

    dancerRepo.dancersRepositoryInstance
      .getByAuthenticationId(loggedInUser.id)
      .then((dancerIdResult) => {
        const dancer = dancerIdResult.okOrDefault();
        Promise.all([
          dishesRepo.dishesRepositoryInstance.getAll(),
          // eslint-disable-next-line max-len
          ingredientsRepo.ingredientsRepositoryInstance.getGradedIngredientsByDancer(
            dancer.id,
            true,
          ),
        ]).then(([dishesResult, dancerIngredientResult]) => {
          if (dishesResult.isOk()) {
            setDishes(dishesResult.okOrDefault());
          }

          if (dancerIngredientResult.isOk()) {
            setDancerIngredients(
              new Map(
                dancerIngredientResult
                  .okOrDefault()
                  .map((gdi) => [gdi.gradedIngredient.name, gdi]),
              ),
            );
          }

          setIsLoading(false);
        });
      });
  }, []);

  const gridColumns = 4;
  const totalCourseCoverWidth = 8 * 34 + 4;

  return (
    <Container maxW={gridColumns * totalCourseCoverWidth} p={8}>
      <Heading textAlign="center" mb={4}>
        Stamina course submission
      </Heading>
      {isLoading && (
        <Center>
          <Spinner // todo: replace this with proper skeleton structure
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
      {!isLoading && (
        <SimpleGrid
          spacing={4}
          columns={5}
          minChildWidth={`${defaultPixel * 34}px`}
        >
          {dishes?.map((d) => (
            <DishDisplay
              key={d.id}
              dish={d}
              obtainedIngredients={d.ingredients
                .map((i) => dancerIngredients?.get(i.name))
                .filter<DancerGradedIngredient>(
                  (gi): gi is DancerGradedIngredient => Boolean(gi),
                )}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default CourseSubmission;
