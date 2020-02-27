import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { WebView } from "react-native-webview";

export default class Home extends Component {
  render() {
    return (
      <WebView
      source={{uri:'http://orchardwatch.surge.sh/home'}}
      style = {styles.webstyle}
      />   
    )
  }
}

const styles = StyleSheet.create({
  webstyle: {
    marginTop: 40
  }
});