import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { WebView } from "react-native-webview";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Camera from 'react-native-camera';
import CameraPage from "./camera.page";
import Datasets from "./datasets";

const Tab = createBottomTabNavigator()

export default class Home extends Component {
  Website() {
    return (
      <WebView
      source={{uri:'http://orchardwatch.surge.sh/home'}}
      style = {styles.webstyle}
      />   
    )
  }

  Datasets() {
    return (
      <View>
        <Datasets />
      </View>
    )
  }

  Camera() {
    return (
      <View style={{flex : 1}}>
        <CameraPage />
      </View>
    )
  }

  render() {
    return (
        <Tab.Navigator initialRouteName = "Website">
          <Tab.Screen name="WebSite" component={this.Website} />
          <Tab.Screen name="Datasets" component={this.Datasets} />
          <Tab.Screen name="Camera" component={this.Camera} />
        </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  webstyle: {
    marginTop: 40
  }
});