import { createMuiTheme } from '@material-ui/core/styles';

import { sumi, sakura, midori } from './color';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: sumi,
    },
    secondary: {
      main: midori,
    },
    background: {
      default: sakura,
    },
  },
});

export default theme;
