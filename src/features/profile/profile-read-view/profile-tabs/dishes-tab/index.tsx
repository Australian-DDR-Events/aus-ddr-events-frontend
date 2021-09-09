import { Center, SimpleGrid, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import DishScoreDisplay from './dish-score-display';

const DishesTab = ({ dancerId }: { dancerId: string }) => {
  return <></>;
  // useEffect(() => {
  //   if (data?.dishesByDancerId) {
  //     setDancerGradedDishes(data.dishesByDancerId);
  //   }
  // }, [data]);

  // if (fetching)
  //   return (
  //     <Center mt={2}>
  //       <Spinner // todo: replace this with proper skeleton structure
  //         thickness="4px"
  //         speed="0.65s"
  //         emptyColor="gray.200"
  //         color="blue.500"
  //         size="xl"
  //       />
  //     </Center>
  //   );

  // return (
  //   <SimpleGrid
  //     columns={{ base: 1, md: 2, xl: 3 }}
  //     mt={4}
  //     mb={4}
  //     spacing={4}
  //     w="fit-content"
  //   >
  //     {dancerGradedDishes.map((dancerGradedDish) => (
  //       <Center>
  //         <DishScoreDisplay dancerGradedDish={dancerGradedDish} />
  //       </Center>
  //     ))}
  //   </SimpleGrid>
  // );
};

export default DishesTab;
