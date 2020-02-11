/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  ImageBackground,
  Text,
  View
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerItem,
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

const RichDrawerItem = ({label, target, navigation}) => {
  return (
    <ImageBackground source={require('./assets/images/h2.png')} style={{width: 250, height: 65}}>
      <DrawerItem
        label={label}
        labelStyle={{fontFamily: 'Pirata One', fontSize: 26, color: 'black'}}
        onPress={() => navigation.jumpTo(target)}
      />
    </ImageBackground>
  )
}

const DrawerContent = (props) => {
  console.log(props.navigation)
  return (
    <ImageBackground source={require('./assets/images/background.jpg')} style={{width: '100%', height: '100%'}}>
      <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <RichDrawerItem label={"Home"} target={"Home"} navigation={props.navigation} />
          <RichDrawerItem label={"City events"} target={"City"} navigation={props.navigation}/>
          <RichDrawerItem label={"Road events"} target={"Road"} navigation={props.navigation}/>
          <RichDrawerItem label={"History"} target={"History"} navigation={props.navigation}/>
        </View>
        <View>
        </View>
        <View>
          <DrawerItem
            label={"About"}
            labelStyle={{fontFamily: 'Pirata One', fontSize: 24, color: 'black'}}
            onPress={() => props.navigation.jumpTo("About")}
          />
          <Text style={{color: 'grey', margin: 18}}>All Gloomhaven images and content are trademarks and copyrights of Cephalofair Games®</Text>
        </View>
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
