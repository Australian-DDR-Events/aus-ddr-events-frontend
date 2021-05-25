/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';
import enableHooks from 'jest-react-hooks-shallow';

configure({ adapter: new Adapter() });

enableHooks(jest);
