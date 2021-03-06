import React, { useState } from 'react';
import {
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';

import { defaultSpacing } from 'types/styled-components';
import Step1 from './components/step-1';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';

const HowTo = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isSmallerThan425] = useMediaQuery('(max-width:425px)');
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Tabs
      variant="soft-rounded"
      index={tabIndex}
      onChange={handleTabsChange}
      pb={defaultSpacing}
      align="center"
    >
      {isSmallerThan425 ? (
        <>
          <Heading size="md">Step</Heading>
          <TabList>
            <Tab>1</Tab>
            <Tab>2</Tab>
            <Tab>3</Tab>
            <Tab>4</Tab>
            <Tab>5</Tab>
          </TabList>
        </>
      ) : (
        <TabList>
          <Tab>Step 1</Tab>
          <Tab>Step 2</Tab>
          <Tab>Step 3</Tab>
          <Tab>Step 4</Tab>
          <Tab>Step 5</Tab>
        </TabList>
      )}

      <TabPanels>
        <TabPanel>
          <Step1 />
        </TabPanel>
        <TabPanel>
          <Step2 />
        </TabPanel>
        <TabPanel>
          <Step3 />
        </TabPanel>
        <TabPanel>
          <Step4 />
        </TabPanel>
        <TabPanel>
          <Step5 />
        </TabPanel>
      </TabPanels>
      <Center>
        <Button
          width="120px"
          mr={defaultSpacing / 4}
          size="lg"
          onClick={() => setTabIndex(tabIndex - 1)}
          disabled={tabIndex === 0}
        >
          Previous
        </Button>
        <Button
          width="120px"
          size="lg"
          colorScheme="blue"
          variant="solid"
          onClick={() => setTabIndex(tabIndex + 1)}
          disabled={tabIndex === 4}
        >
          Next
        </Button>
      </Center>
    </Tabs>
  );
};

export default HowTo;
