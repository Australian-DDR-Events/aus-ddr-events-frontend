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

  console.log(dishes);

  return (
    <>
      <div>asdasd</div>
      {/* <Table
            bordered
            size="middle"
            scroll={{ x: 80, y: 300 }}
            pagination={false}
            dataSource={}
          >
            <Column
              width={12}
              title="Ingredient"
              key="ingredient"
              render={(i) => (
                <>
                  <Image
                    style={{ maxWidth: '40px' }}
                    src={`${process.env.ASSETS_URL}${i.ingredientImageUrl}`}
                    alt="ingredient image"
                  />
                </>
              )}
            />

            <Column
              width={32}
              title="Ingredient Name"
              key="exscore"
              dataIndex="ingredientName"
            />
            <Column
              width={32}
              title="Quality"
              key="exscore"
              dataIndex="ingredientGrade"
            />
            <Column
              width={32}
              title="Scores"
              key="exscore"
              dataIndex="songScore"
            />
          </Table> */}
    </>
  );
};

export default Dishes;
