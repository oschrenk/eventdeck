/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';

import EditScreen from './app/screens/EditScreen'
import HomeScreen from './app/screens/HomeScreen'
import PartyScreen from './app/screens/PartyScreen'
import SettingsScreen from './app/screens/SettingsScreen'

import { CardDeckProvider } from './app/contexts/CardDeckContext'

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <CardDeckProvider>
      <NavigationNativeContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Edit" component={EditScreen} />
          <Drawer.Screen name="Party" component={PartyScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationNativeContainer>
    </CardDeckProvider>
  );
};

export default App;
