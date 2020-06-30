/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

//Local
import Store from './src/common/redux/Store'
import Main from './src/modules/Main/Main'
import Settings from './src/modules/Settings/Settings'
import {themeLight, appBarTheme} from './src/common/Theme'

const Stack = createStackNavigator();

const App: () => React$Node = () => {

  function createHomeStack() {
    return(
      <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Main}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
      />
    </Stack.Navigator>
    )
  }

  return (
    <ThemeProvider theme={themeLight}>
      <Provider store={Store}>
        <NavigationContainer theme={appBarTheme}>
          {createHomeStack()}
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;


{/*<CommonProvider>
      <CommonConsumer>
        {context => (
          <ThemeProvider theme={context.state.theme}>
            <Main/>
          </ThemeProvider>
        )}
      </CommonConsumer>
    </CommonProvider>*/}
