import React, { Component, Fragment } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import Dialog from 'react-native-dialog';
import NavigationBar from "react-native-navbar";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ActionSheetCustom from "react-native-actionsheet";
import ActionSheet from 'react-native-actionsheet';
import {ListItem} from "react-native-elements";
import ExistDataset from "./exist_dataset";

export default class DataSets extends Component {

  state = {
    dialogVisible: false,
    entry: "",
    todisplay: null,
    data: {},
  }

  handleConfirm = () => {
    var locationName = this.state.entry

    if(locationName !== "" && !(this.contains(locationName.toLowerCase()))){
        this.ActionSheet.show()
    }else if(this.contains(locationName.toLowerCase())){
        alert("Location name already exists")
    }else{
        alert("Enter a valid location")
    }
  }

  contains = (name) => this.entries.findIndex(loc => loc.key === name) !== -1


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
    {key: 'location1', last: '3/24/20', data: {
      numberOfClusters: 0,
      numberOfTrees: 0,
      projectedApples: 0
    }},
    {key: 'location2', last: '3/20/20', data: {}}
  ];

  actionHandler(index) {
      var currDate = new Date()
      var dateFormat = currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100

      if(index === 0 || index === 1)
      {
        this.setState({dialogVisible: false})
        this.entries.push({key: this.state.entry.toLowerCase(), last: dateFormat})
        this.props.navigation.navigate('CameraPage')
        this.setState({entry: ""})
      }
      else if(index === 2)
      {
        this.setState({dialogVisible: false})
        this.props.navigation.navigate('TabularEntry', {entries: this.entries, key: this.state.entry.toLowerCase(), last: dateFormat})
        // this.entries.push({key: this.state.entry.toLowerCase(), last: currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100})
        this.setState({entry: ""})
      }
  }

  renderItems = ({item}) =>
    <ListItem 
      containerStyle = {styles.listItem}
      title={item.key} 
      subtitle={"Last Updated: " + item.last} 
      bottomDivider
      topDivider
      chevron = {{color: 'black'}}
      onPress={() => this.setState({todisplay: item.key, data: item.data})}
    />


  back = () => {
    this.setState({todisplay: null, data: {}})
  }

  optionsArray = ['Tree Picture', 'Cluster Picture', 'Manual Entry', 'Cancel']


  render() {

    if(this.state.todisplay === null)
    {
      return (
        <View style={styles.container}>
          <NavigationBar 
              title = {{title: 'Datasets'}}
              rightButton = {this.rightButton}
              style = {styles.navbar}
          />

          <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>Location</Dialog.Title>
              <Dialog.Description>Please enter the location of the dataset</Dialog.Description>
              <Dialog.Input onChangeText={entry => this.setState({entry})} value={this.state.entry} style={{color: 'black'}} />
              <Dialog.Button label="Ok" onPress={this.handleConfirm} />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          </Dialog.Container>

          <FlatList
              data={this.entries}
              renderItem={this.renderItems}
          />

          <ActionSheet 
              ref = {o => (this.ActionSheet = o)}
              title = {'Choose data entry mode'}
              options = {this.optionsArray}
              cancelButtonIndex = {3}
              onPress = {index => {this.actionHandler(index)}}
          />
          

        </View>
      )
    }
    else {
      return (

        <Fragment>
          <View>
            <NavigationBar 
              title = {{title: this.state.todisplay}}
              leftButton = {{title: '< Back', handler: this.back}}
              style = {styles.navbarS}
            />
          </View>
          <ExistDataset />

        </Fragment>
      )
    }
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
  navbar: {
    marginTop: 0,
    width: Dimensions.get('window').width,
  },
  rightButton: {
    width: 20,
    height: 20,
  },
  navbarS: {
    marginTop: 40,
    width: Dimensions.get('window').width,
  },
});

