import React, { useState } from 'react';
import { Button, Heading } from '@chakra-ui/react';
import { Steps } from 'antd';
import { defaultSpacing } from 'types/styled-components';
import { HowToWrapper, StepsContent, StepsAction } from './styled';
import Step1 from './components/step-1';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';

const HowTo = () => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Step 1',
      content: <Step1 />,
    },
    {
      title: 'Step 2',
      content: <Step2 />,
    },
    {
      title: 'Step 3',
      content: <Step3 />,
    },
    {
      title: 'Step 4',
      content: <Step4 />,
    },
    {
      title: 'Step 5',
      content: <Step5 />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <HowToWrapper>
      <Heading size="xl">How to Participate</Heading>
      <Steps responsive size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent>{steps[current].content}</StepsContent>
      <StepsAction className="steps-action">
        <Button
          width="120px"
          mr={defaultSpacing / 2}
          size="lg"
          onClick={() => prev()}
          disabled={current === 0}
        >
          Previous
        </Button>
        <Button
          width="120px"
          ml={defaultSpacing / 2}
          size="lg"
          colorScheme="blue"
          variant="solid"
          onClick={() => next()}
          disabled={current === steps.length - 1}
        >
          Next
        </Button>
      </StepsAction>
    </HowToWrapper>
  );
};

export default HowTo;
