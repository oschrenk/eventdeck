/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  ImageBackground,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
 } from '@react-navigation/drawer';


import AboutScreen from './app/screens/AboutScreen'
import CityScreen from './app/screens/CityScreen'
import HistoryScreen from './app/screens/HistoryScreen'
import HomeScreen from './app/screens/HomeScreen'
import PartyScreen from './app/screens/PartyScreen'
import RoadScreen from './app/screens/RoadScreen'

import { CardDeckProvider } from './app/contexts/CardDeckContext'

const Drawer = createDrawerNavigator();

const DrawerContent = (props) => {
  return (
    <ImageBackground source={require('./assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </ImageBackground>
  )
}

const App = () => {
  return (
    <CardDeckProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="City" component={CityScreen} />
          <Drawer.Screen name="Road" component={RoadScreen} />
          <Drawer.Screen name="Party" component={PartyScreen} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </CardDeckProvider>
  );
};

export default App;
