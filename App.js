/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';

import AboutScreen from './app/screens/AboutScreen'
import CityScreen from './app/screens/CityScreen'
import HistoryScreen from './app/screens/HistoryScreen'
import HomeScreen from './app/screens/HomeScreen'
import PartyScreen from './app/screens/PartyScreen'
import RoadScreen from './app/screens/RoadScreen'

import { CardDeckProvider } from './app/contexts/CardDeckContext'

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <CardDeckProvider>
      <NavigationNativeContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="City" component={CityScreen} />
          <Drawer.Screen name="Road" component={RoadScreen} />
          <Drawer.Screen name="Party" component={PartyScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationNativeContainer>
    </CardDeckProvider>
  );
};

export default App;
