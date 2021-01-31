import React, { useState } from 'react';
import { Typography, Space, Steps, Button } from 'antd';
import { HowToWrapper, StepsContent, StepsAction } from './styled';
import Step1 from './components/step-1';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';

const HowTo = () => {
  const { Title } = Typography;
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Step 1',
      content: (
        <Space>
          <Step1 />
        </Space>
      ),
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
      <Title>How to Participate</Title>
      <Steps responsive="true" size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent>{steps[current].content}</StepsContent>
      <StepsAction className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </StepsAction>
    </HowToWrapper>
  );
};

export default HowTo;
