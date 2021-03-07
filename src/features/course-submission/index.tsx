import { Text } from '@chakra-ui/react';
import { DishesRepositoryContext } from 'context/dishes';
import React, { useContext, useEffect, useState } from 'react';
import { Dish } from 'types/summer2021';

const CourseSubmission = () => {
  // const authRepo = useContext(AuthenticationRepositoryContext);
  // const dancerRepo = useContext(DancersRepositoryContext);
  const dishesRepo = useContext(DishesRepositoryContext);
  const [dishes, setDishes] = useState<Dish[]>();
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
      }
    });
  }, []);
  return (
    <>
      {dishes?.map((d) => (
        <Text>{d.name}</Text>
      ))}
    </>
  );
};

export default CourseSubmission;
