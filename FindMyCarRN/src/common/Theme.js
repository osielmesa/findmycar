import Color from 'react-native-material-color';
import { DefaultTheme } from '@react-navigation/native';

export const themeLight = {
  colors: {
    primary:Color.DEEPORANGE[900],
    secondary: Color.DEEPORANGE[900],
    textColor: Color.BLACK,
    backgroundColor: Color.GREY[50]
  }
}

export const themeDark = {
  colors: {
    primary:Color.DEEPORANGE[900],
    secondary: Color.DEEPORANGE[900],
    textColor: Color.WHITE,
    backgroundColor: Color.GREY[900]
  }
}

export const appBarTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:Color.DEEPORANGE[900],
    card: Color.DEEPORANGE[900],
    text: Color.WHITE
  },
}


/*
interface theme {
  colors: {
    primary;
    secondary;
    grey0;
    grey1;
    grey2;
    grey3;
    grey4;
    grey5;
    greyOutline;
    searchBg;
    success;
    error;
    warning;
    divider;
    platform: {
      ios: {
        primary;
        secondary;
        success;
        error;
        warning;
      };
      android: {
        // Same as ios
      };
    };
  };
}
*/
