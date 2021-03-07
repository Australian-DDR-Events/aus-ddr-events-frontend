import { Center, Container, SimpleGrid, Spinner } from '@chakra-ui/react';
import { DishesRepositoryContext } from 'context/dishes';
import React, { useContext, useEffect, useState } from 'react';
import { defaultSpacing } from 'types/styled-components';
import { Dish } from 'types/summer2021';

import DishDisplay from './components/dish-display';

const CourseSubmission = () => {
  // const authRepo = useContext(AuthenticationRepositoryContext);
  // const dancerRepo = useContext(DancersRepositoryContext);
  const dishesRepo = useContext(DishesRepositoryContext);
  const [dishes, setDishes] = useState<Dish[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // const loggedInUser = authRepo.authenticationRepositoryInstance
    //   .get()
    //   .okOrDefault();

    // dancerRepo.dancersRepositoryInstance
    //   .get(loggedInUser.id)
    //   .then((dancerIdResult) => {
    //     const dancer = dancerIdResult.okOrDefault();
    //
    //   });

    dishesRepo.dishesRepositoryInstance.getAll().then((dishesResult) => {
      if (dishesResult.isOk()) {
        setDishes(dishesResult.okOrDefault());
        setIsLoading(false);
      }
    });
  }, []);

  const gridColumns = 4;
  const totalCourseCoverWidth = defaultSpacing * 34 + defaultSpacing / 2;

  if (isLoading)
    return (
      <Center>
        <Spinner // todo: replace this with proper skeleton structure
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );

  return (
    <Container maxW={gridColumns * totalCourseCoverWidth} p={defaultSpacing}>
      <SimpleGrid
        spacing={defaultSpacing / 2}
        columns={5}
        minChildWidth={`${defaultSpacing * 34}px`}
      >
        {dishes?.map((d) => (
          <DishDisplay key={d.id} dish={d} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CourseSubmission;
