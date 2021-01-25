import React from 'react';
import 'antd/dist/antd.css';
import Wrapper from './components/Wrapper';
import Router from './components/Router';

const App = (): React.ReactElement => {
  return (
    <Wrapper>
      <Router />
    </Wrapper>
  );
};

export default App;
