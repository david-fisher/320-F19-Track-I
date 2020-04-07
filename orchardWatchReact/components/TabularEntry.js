import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import t from 'tcomb-form-native';
import NavigationBar from "react-native-navbar";

const Form  = t.form.Form
const data = t.struct({
    numberOfClusters: t.Number,
    numberOfTrees: t.Number
})

export default class TableEntry extends Component{
    render() {
        return (
          <View style={styles.container}>
            <NavigationBar 
                title={{title: 'Enter Data'}}
                leftButton={{title: '< Back', handler: () => {this.props.navigation.navigate('Home')}}}
                rightButton={{title: 'Upload', handler: () => {this.props.navigation.navigate('Home')}}}
            />
            <Form type={data} />
          </View>
        );
      }
}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 40,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#ffffff',
    },
  });