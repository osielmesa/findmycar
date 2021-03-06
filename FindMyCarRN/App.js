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


import Main from './src/modules/Main/Main'

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
};

export default App;
