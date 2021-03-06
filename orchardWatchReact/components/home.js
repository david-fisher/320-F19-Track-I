import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { WebView } from "react-native-webview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from 'react-native-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import CameraNew from "./camera.page";
import Datasets from "./datasets";

const Tab = createBottomTabNavigator()

export default class Home extends Component {

  render() {
    return (
        <Tab.Navigator initialRouteName = "Website"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Datasets') {
              iconName = 'database';
            } else if (route.name === 'Camera') {
              iconName = 'camera';
            }


            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
          <Tab.Screen name="Datasets" component={Datasets} />
          <Tab.Screen name="Camera" component={CameraNew} />
        </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  webstyle: {
    marginTop: Constants.statusBarHeight
  }
});