import React, { useContext, useState, useEffect } from 'react';
import { DishesRepositoryContext } from 'context/dishes';
import { DefaultDish } from 'context/dishes/constants';

const Dishes = () => {
  const dishesRepo = useContext(DishesRepositoryContext);
  const [dishes, setDishes] = useState(Array(DefaultDish));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      dishesRepo.dishesRepositoryInstance.getAll().then((dishesRes) => {
        setDishes(dishesRes.okOrDefault());
        setLoading(false);
      });
    }
  }, []);

  return (
    <>
      <div>asdasd</div>
    </>
  );
};

export default Dishes;
