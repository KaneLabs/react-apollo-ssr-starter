import { createMuiTheme } from 'material-ui-next/styles';
import colors from './colors';

const purpleGoldTheme = createMuiTheme({
  palette: {
    ...colors,
    type: 'light',
  },
});

export default purpleGoldTheme;
