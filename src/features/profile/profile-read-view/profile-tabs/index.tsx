import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import { DishesRepositoryContext } from 'context/dishes';
import React, { useContext, useState } from 'react';
import {
  BadgeFieldsFragment,
  DancerFieldsFragment,
  DancerGradedIngredientsFragment,
} from 'types/graphql.generated';
import { DancerGradedDish } from 'types/summer2021';

import BadgesTab from './badges-tab';
import DishesTab from './dishes-tab';
import IngredientsTab from './ingredients-tab';

const ProfileTabs = ({ dancer }: { dancer: DancerFieldsFragment }) => {
  const [badges, setBadges] = useState<BadgeFieldsFragment[]>([]);

  const [dancerGradedIngredients, setDancerGradedIngredients] = useState<
    DancerGradedIngredientsFragment[]
  >([]);

  // Set up for dishes tab
  const dishesRepository = useContext(DishesRepositoryContext);
  const [dancerGradedDishes, setDancerGradedDishes] = useState(
    new Array<DancerGradedDish>(),
  );
  const [isDishesTabLoaded, setIsDishesTabLoaded] = useState(false);
  const [isDishesTabLoading, setIsDishesTabLoading] = useState(true);
  /**
   * Load the graded dishes for the user of the profile being viewed
   * if the graded dishes have not already been loaded
   * @returns the profile user's graded dishes
   */
  const loadDishScores = () => {
    if (isDishesTabLoaded) return;

    dishesRepository.dishesRepositoryInstance
      .getDancerGradedDishes(dancer.id)
      .then((dancerGradedDishesResult) => {
        if (dancerGradedDishesResult.isOk()) {
          setDancerGradedDishes(dancerGradedDishesResult.value);
          setIsDishesTabLoaded(true);
          setIsDishesTabLoading(false);
        }
      });
  };

  const [isSmallerThan1024] = useMediaQuery(['(max-width: 1023px)']);
  return (
    <Tabs
      w={!isSmallerThan1024 ? 'fit-content' : '90vw'}
      variant="soft-rounded"
      align={!isSmallerThan1024 ? 'start' : 'center'}
      isLazy
    >
      <TabList>
        <Tab>Badges</Tab>
        <Tab>Ingredients</Tab>
        <Tab>Dishes</Tab>
      </TabList>

      <TabPanels>
        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <BadgesTab
            dancerId={dancer.id}
            badges={badges}
            setBadges={setBadges}
          />
        </TabPanel>

        <TabPanel minW={{ base: '100%', md: '65vw' }}>
          <IngredientsTab
            dancerId={dancer.id}
            dancerGradedIngredients={dancerGradedIngredients}
            setDancerGradedIngredients={setDancerGradedIngredients}
          />
        </TabPanel>

        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <DishesTab
            isLoading={isDishesTabLoading}
            dancerGradedDishes={dancerGradedDishes}
            loadDishScores={loadDishScores}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
