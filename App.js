import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';

import HomeScreen from './app/screens/HomeScreen'
import EditScreen from './app/screens/EditScreen'

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {

  return (
    <NavigationNativeContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Edit" component={EditScreen} />
      </Drawer.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
