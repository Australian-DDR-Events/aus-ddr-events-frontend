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

const ProfileTabs = ({ dancer }: { dancer: Dancer }) => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Tabs
      w="100%"
      variant="soft-rounded"
      align={isLargerThan800 ? 'start' : 'center'}
    >
      <TabList>
        <Tab>Badges</Tab>
        <Tab>Scores</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <BadgesTab dancer={dancer} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
