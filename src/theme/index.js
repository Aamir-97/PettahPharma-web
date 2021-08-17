import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#0A6466'
    },
    secondary: {
      contrastText: '#ffffff',
      main: '#ffffff'
    },
    rebutton: {
      contrastText: '#ffffff',
      main: '	#FF0000'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      red:	'#FF0000',
    }
  },
  shadows,
  typography
});

export default theme;
