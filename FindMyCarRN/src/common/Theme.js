import Color from 'react-native-material-color';
import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet, Platform } from 'react-native';

export const ElementsTheme = {
  colors: {
    primary:Color.BLUE[600],
    secondary: Color.BLUE[600],
    textColor: Color.BLACK,
    backgroundColor: Color.GREY[50],
    title: '#BDBDBD',
  }
}

export const NavigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:Color.BLUE[600],
    card: Color.BLUE[600],
    text: Color.WHITE,
    title: '#BDBDBD',
  },
}

export const getHeaderStyle = () => {
  let headerStyle = StyleSheet.create({
    header:{
      elevation: 10,
    }
  });
  if(Platform.OS === 'ios'){
    headerStyle = StyleSheet.create({
      header:{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7,
        zIndex:2,
      }
    });
  }
  return headerStyle.header;
}
