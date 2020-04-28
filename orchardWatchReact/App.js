import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import Home from './components/home';
import Login from './components/login';
import Datasets from './components/datasets';
import { Cookies } from "react-cookie";
import CameraWindow from './components/camera.window'
import Gallery from "./components/gallery";
import TableEntry from "./components/TabularEntry";
import ExistDataset from "./components/exist_dataset";
import * as ScreenOrientation from 'expo-screen-orientation';


const Stack = createStackNavigator();
// const cookies = new Cookies();
export default class App extends Component {

  async componentDidMount() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
  // authentication = Cookies.get('authenticated')
  setRoute = async () => {
    // if (cookies.get('authenticated',{path: '/'}) === true) {
    //   return 'Home'
    // } else {
    //   return 'Login'
    // }
    try {
      const authenticated = await AsyncStorage.getItem('authenticated')
      if (authenticated === null) {
        return 'Login'
      }
      else {
        return 'Home'
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    console.disableYellowBox = true
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName= {this.setRoute}
          screenOptions={{ gestureEnabled: false }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login', headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Homepage', headerShown: false }}
          />
          <Stack.Screen
            name="Datasets"
            component={Datasets}
            options={{ title: 'Datasets', headerShown: true}}
          />
          <Stack.Screen
            name="CameraPage"
            component={CameraWindow}
            options={{ title: 'Camera', headerShown: false }}
          />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={{ title: 'Gallery', headerShown: false }}
          />
          <Stack.Screen
            name="TabularEntry"
            component={TableEntry}
            options={{ title: 'Table', headerShown: false }}
          />
          <Stack.Screen
            name="ExistDataset"
            component={ExistDataset}
            options={{ title: 'exist', headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
