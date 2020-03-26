import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import Home from './components/home';
import Login from './components/login';
import Datasets from './components/datasets';
import CameraPage from "./components/camera.page"
import { Cookies } from "react-cookie";

const Stack = createStackNavigator();
const cookies = new Cookies();
export default class App extends Component {
  // authentication = Cookies.get('authenticated')
  setRoute() {
    if (cookies.get('authenticated',{path: '/'}) === true) {
      return 'Home'
    } else {
      return 'Login'
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName= {this.setRoute()}
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
          {/* <Stack.Screen
            name="Camera"
            component={CameraPage}
            options={{ title: 'Homepage' }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
