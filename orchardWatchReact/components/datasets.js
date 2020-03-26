import React, { Component } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import Dialog from 'react-native-dialog';
import NavigationBar from "react-native-navbar";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class DataSets extends Component {

  state = {
    dialogVisible: false,
    entry: ""
  }

  handleConfirm = () => {
    if(this.state.entry.length > 0){
      var currDate = new Date()
      this.entries.push({key: this.state.entry, last: currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100})
    }else{
      alert("Enter a valid location")
    }

    this.setState({entry: ""})
    this.setState({dialogVisible: false})
  }

  handleCancel = () => {
    this.setState({dialogVisible: false})
  }

  showDialog = () => {
    this.setState({dialogVisible: true})
  }

  rightButton = {
    title: '+',
    handler: () => {this.showDialog()},
    style: styles.rightButton
  }

  entries = [
    {key: 'location1', last: '3/24/20'},
    {key: 'location2', last: '3/20/20'}
  ];


  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
                title = {{title: 'Datasets'}}
                rightButton = {this.rightButton}
                style = {styles.navbar}
                // tintColor = {'black'}
        />

        <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Location</Dialog.Title>
            <Dialog.Description>Please enter the location of the dataset</Dialog.Description>
            <Dialog.Input onChangeText={entry => this.setState({entry})} value={this.state.entry} />
            <Dialog.Button label="Ok" onPress={this.handleConfirm} />
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>

        <FlatList
          data={this.entries}
          renderItem={({item}) => <Text style={styles.item}>{item.key}                                 Last updated: {item.last}</Text>}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#a9d1b9',
    padding: 30,
    marginVertical: 1,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 32,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    padding: 20,
  },
  navbar: {
    marginTop: 0,
    width: Dimensions.get('window').width,
  },
  rightButton: {
    width: 20,
    height: 20,
    fontSize: 50,
    lineHeight: 20
  }
});