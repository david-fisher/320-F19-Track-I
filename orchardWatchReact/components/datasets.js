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
    entries: [],
    update: false,
    targetfruitupdate: 0,
    averagenumberclustersupdate: 0,
    potentialfruitpertreeupdate: 0,
    updateid: 0
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

  contains = (name) => this.state.entries.findIndex(loc => loc.name === name) !== -1


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

  actionHandler(index) {
      var currDate = new Date()
      var dateFormat = currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100

      if(index === 0 || index === 1)
      {
        this.setState({dialogVisible: false})
        // this.entries.push({key: this.state.entry.toLowerCase(), last: dateFormat})
        this.props.navigation.navigate('CameraPage')
        this.setState({entry: ""})
      }
      else if(index === 2)
      {
        this.setState({dialogVisible: false})
        // this.props.navigation.navigate('TabularEntry', {entries: this.entries, key: this.state.entry.toLowerCase(), last: dateFormat})
        // this.entries.push({key: this.state.entry.toLowerCase(), last: currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100})
        this.props.navigation.navigate('TabularEntry',{name:this.state.entry})
        this.setState({entry: ""})
      }
  }

  renderItems = ({item}) =>
    <ListItem 
      containerStyle = {styles.listItem}
      title={item.name} 
      subtitle={"Location: " + item.location} 
      bottomDivider
      topDivider
      chevron = {{color: 'black'}}
      onPress={() => this.setState({todisplay: item.name, data: this.getData(item),updateid: item.orchardid})}
    />

  getData(item) {
    if ('targetfruitpertree' in item) {
      return [
        {key: 'Target Fruit Per Tree',data: item.targetfruitpertree},
        {key: 'Average Number of Clusters',data: item.averagenumberclusters},
        {key: 'Potential Fruits per Tree',data: item.potentialfruitpertree}
      ]
    }
    else {
      return [
        {key: 'Target Fruit Per Tree',data: 0},
        {key: 'Average Number of Clusters',data: 0},
        {key: 'Potential Fruits per Tree',data: 0}
      ]
    }
  }

  back = () => {
    this.setState({todisplay: null, data: {}})
  }

  optionsArray = ['Tree Picture', 'Cluster Picture', 'Manual Entry', 'Cancel']

  componentDidMount() {
    fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/orchards',{
      method: 'GET'
    }).then((res) => res.json())
    .then((json) => {
      this.setState({entries:json})
    })
  }

  update = () => {
    this.setState({update:true})
  }

  cancelUpdate = () => {
    this.setState({update:false})
  }

  upload = () => {
    fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/update-data/'+this.state.updateid, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.makeData())
    }).then((res)=>{
      if (res.status === 200) {
        alert('Update successful')
      }
    })
    this.setState({update:false, todisplay: null, data: {}})
  }
  
  makeData() {
    return {
      averagenumberclusters: this.state.averagenumberclustersupdate,
      potentialfruitpertree: this.state.potentialfruitpertreeupdate,
      targetfruitpertree: this.state.targetfruitupdate
    }
  }

  render() {
    this.componentDidMount()
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
              data={this.state.entries}
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
    else if (this.state.update) {
      return (
      <View>
        <NavigationBar 
          title = {{title: this.state.todisplay, tintColor: 'black'}}
          leftButton = {{title: 'Cancel', handler: this.cancelUpdate}}
          rightButton = {{title: 'Upload', handler: this.upload}}
          style = {styles.navbarS}
        />
        <TextInput style={styles.input}
          placeholder="Target Fruit per Tree"
          keyboardType = 'number-pad'
          onChangeText={(clusters)=>this.setState({targetfruitupdate: clusters})}
        />
        <TextInput style={styles.input}
          placeholder="Average number of clusters"
          keyboardType = 'number-pad'
          onChangeText={(trees)=>this.setState({averagenumberclustersupdate: trees})}
        />
        <TextInput style={styles.input}
          placeholder="Potential fruits per tree"
          keyboardType = 'number-pad'
          onChangeText={(apples)=>this.setState({potentialfruitpertreeupdate: apples})}
        />
      </View>
      )
    }
    else {
      return (

        <Fragment>
          <View>
            <NavigationBar 
              title = {{title: this.state.todisplay, tintColor: 'black'}}
              leftButton = {{title: '< Back', handler: this.back}}
              rightButton = {{title: 'Update', handler: this.update}}
              style = {styles.navbarS}
            />
          </View>
          <ExistDataset data = {this.state.data}/>

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
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  }
});

