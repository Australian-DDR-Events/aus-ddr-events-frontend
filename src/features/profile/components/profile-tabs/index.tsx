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
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Tabs
      w={isLargerThan800 ? 'fit-content' : '90vw'}
      variant="soft-rounded"
      align={isLargerThan800 ? 'start' : 'center'}
    >
      <TabList>
        <Tab>Badges</Tab>
        <Tab>Scores</Tab>
      </TabList>

      <TabPanels>
        <TabPanel minW="28vw">
          <BadgesTab dancer={dancer} />
        </TabPanel>
        <TabPanel minW="28vw">
          <ScoresTab dancer={dancer} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
