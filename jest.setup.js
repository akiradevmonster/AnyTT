import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// enzyme setup
configure({ adapter: new Adapter() });

// error handling
const logAndExit = error => {
  console.error(error);
  process.exit(1);
};
process.on('unhandledRejection', logAndExit);
