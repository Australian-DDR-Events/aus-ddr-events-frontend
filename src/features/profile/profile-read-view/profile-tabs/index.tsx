import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import { BadgesRepositoryContext } from 'context/badges';
import { Badge } from 'context/badges/types';
import { Dancer } from 'context/dancer';
import { DishesRepositoryContext } from 'context/dishes';
import React, { useContext, useState } from 'react';
import { DancerGradedDish } from 'types/summer2021';

import BadgesTab from './badges-tab';
import DishesTab from './dishes-tab';
import ScoresTab from './ingredients-tab';

const ProfileTabs = ({ dancer }: { dancer: Dancer }) => {
  // Set up badges tab
  const badgesRepo = useContext(BadgesRepositoryContext);
  const [dancerBadges, setDancerBadges] = useState(new Array<Badge>());
  const [isBadgesTabLoaded, setIsBadgesTabLoaded] = useState(false);
  const [isBadgesTabLoading, setIsBadgesTabLoading] = useState(true);
  const loadBadges = () => {
    if (isBadgesTabLoaded) return;

    badgesRepo.badgesRepositoryInstance
      .getForDancerId(dancer.id)
      .then((badgeResult) => {
        if (badgeResult.isOk()) {
          setDancerBadges(badgeResult.value);
          setIsBadgesTabLoaded(true);
          setIsBadgesTabLoading(false);
        }
      });
  };

  // TODO - Set up ingredient tab

  // Set up for dishes tab
  const dishesRepository = useContext(DishesRepositoryContext);
  const [dancerGradedDishes, setDancerGradedDishes] = useState(
    new Array<DancerGradedDish>(),
  );
  const [isDishesTabLoaded, setIsDishesTabLoaded] = useState(false);
  const [isDishesTabLoading, setIsDishesTabLoading] = useState(true);
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
            isLoading={isBadgesTabLoading}
            dancerId={dancer.id}
            dancerBadges={dancerBadges}
            onDancerBadgesChanged={setDancerBadges}
            loadBadges={loadBadges}
          />
        </TabPanel>

        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <ScoresTab dancer={dancer} />
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
