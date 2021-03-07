import React from 'react';
import { Dancer } from 'context/dancer';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
} from '@chakra-ui/react';
import BadgesTab from '../badges-tab';
import ScoresTab from '../scores-tab';

const ProfileTabs = ({ dancer }: { dancer: Dancer }) => {
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
        <Tab>Scores</Tab>
      </TabList>

      <TabPanels>
        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <BadgesTab dancer={dancer} />
        </TabPanel>
        <TabPanel minW={isSmallerThan1024 ? '100%' : '65vw'}>
          <ScoresTab dancer={dancer} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
