import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useMediaQuery,
} from '@chakra-ui/react';
import React from 'react';
import { DancerFieldsFragment } from 'types/graphql.generated';

import BadgesTab from './badges-tab';
import DishesTab from './dishes-tab';
import IngredientsTab from './ingredients-tab';

const ProfileTabs = ({ dancer }: { dancer: DancerFieldsFragment }) => {
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
          <BadgesTab dancerId={dancer.id} />
        </TabPanel>

        <TabPanel minW={{ base: '100%', md: '65vw' }}>
          <IngredientsTab dancerId={dancer.id} />
        </TabPanel>

        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <DishesTab dancerId={dancer.id} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
