import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import { Badge } from 'context/badges';
import { Dancer } from 'context/dancer';
import { DishesRepositoryContext } from 'context/dishes';
import { IngredientsRepositoryContext } from 'context/ingredients';
import { SongsRepositoryContext } from 'context/songs';
import React, { useContext, useState } from 'react';
import { Song } from 'types/core';
import { DancerGradedDish, DancerGradedIngredient } from 'types/summer2021';

import BadgesTab from './badges-tab';
import DishesTab from './dishes-tab';
import IngredientsTab from './ingredients-tab';

const ProfileTabs = ({ dancer }: { dancer: Dancer }) => {
  const [badges, setBadges] = useState<Badge[]>([]);

  // Set up ingredient tab
  const [dancerGradedIngredients, setDancerGradedIngredients] = useState<
    DancerGradedIngredient[]
  >(new Array<DancerGradedIngredient>());
  const ingredientsRepository = useContext(IngredientsRepositoryContext);
  const songsRepository = useContext(SongsRepositoryContext);
  const [songs, setSongs] = useState<Map<string, Song>>(new Map());
  const [isIngredientsTabLoaded, setIsIngredientsTabLoaded] = useState(false);
  const [isIngredientsTabLoading, setIsIngredientsTabLoading] = useState(true);
  /**
   * Load the graded ingredients and the related songs
   * for the user of the profile being viewed
   * if these information have not already been loaded
   * @returns the profile user's graded
   */
  const loadGradedIngredients = () => {
    if (isIngredientsTabLoaded) return;

    ingredientsRepository.ingredientsRepositoryInstance
      .getGradedIngredientsByDancer(dancer.id, true)
      .then((result) => {
        if (result.isOk()) {
          const songIds = result.value.map((r) => r.score.songId);

          songsRepository.songsRepositoryInstance
            .getByIds(songIds)
            .then((songsResult) => {
              if (songsResult.isOk()) {
                setDancerGradedIngredients(result.value);
                setSongs(new Map(songsResult.value.map((s) => [s.id, s])));
                setIsIngredientsTabLoading(false);
                setIsIngredientsTabLoaded(true);
              }
            });
        }
      });
  };

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
            dancerGradedIngredients={dancerGradedIngredients}
            songs={songs}
            isLoading={isIngredientsTabLoading}
            loadGradedIngredients={loadGradedIngredients}
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
