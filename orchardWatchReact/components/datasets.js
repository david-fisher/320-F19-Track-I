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
    isFetching: false,
    entry: "",
    todisplay: null,
    data: {},
    entries: [],
    update: false,
    targetfruitupdate: 0,
    averagenumberclustersupdate: 0,
    potentialfruitpertreeupdate: 0,
    updateid: 0,
  }

  onRefresh() {
    this.setState({isFetching: true}, function() { this.setEntries() })
  }

  handleConfirm = () => {
    var locationName = this.state.entry

    if(locationName !== "" && !(this.contains(locationName))){
        this.ActionSheet.show()
    }else if(this.contains(locationName)){
        alert("Location name already exists")
    }else{
        alert("Enter a valid location")
    }
  }

  contains = (name) => this.state.entries.findIndex(loc => loc.name.toUpperCase() === name.toUpperCase()) !== -1


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

  actionHandler = async (index) => {
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
        this.props.navigation.navigate('TabularEntry', {name:this.state.entry, data: dateFormat})
        this.setState({entry: ""})
      }
  }

  renderItems = ({item}) =>
      <ListItem 
        containerStyle = {styles.listItem}
        title={item.name} 
        titleStyle={{color: '#618759', fontWeight: 'bold'}}
        subtitle={"Location: " + item.location + "\nLast Updated: " + item.lastUpdated} 
        bottomDivider
        topDivider
        chevron = {{color: '#618759'}}
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

  setEntries = async () => {
    fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/orchards',{
      method: 'GET'
    }).then((res) => res.json())
    .then((json) => {
      this.setState({entries:json, isFetching: false})
    })
  }

  componentDidMount() {
    this.setEntries()
  }

  update = () => {
    this.ActionSheetUpdate.show()
    // this.setState({update:true})
  }

  actionHandlerUpdate = async (index) => {
    var currDate = new Date()
    var dateFormat = currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100

    if(index === 0 || index === 1)
    {
      this.props.navigation.navigate('CameraPage')
    }
    else if(index === 2)
    {
      this.setState({update:true})
    }
}

  cancelUpdate = () => {
    this.setState({update:false})
  }

  upload = async () => {
    let dataObj = this.makeData()

    if(Object.keys(dataObj).length > 1){
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
          this.setState({update:false, todisplay: null, data: {}})
        }else{
          alert('Something went wrong with updating the dataset')
        }
      })
    }else{
      alert('Fill out at least one field to update')
    }
  }
  
  makeData() {
    var currDate = new Date()
    var dateFormat = currDate.getMonth()+1 + "/" + currDate.getDate() + "/" + currDate.getYear()%100
    var dataObj = {}

    dataObj.lastUpdated = dateFormat
    if(this.state.averagenumberclustersupdate !== 0 && this.state.averagenumberclustersupdate !== "") dataObj.averagenumberclusters = this.state.averagenumberclustersupdate
    if(this.state.potentialfruitpertreeupdate !== 0 && this.state.potentialfruitpertreeupdate !== "") dataObj.potentialfruitpertree = this.state.potentialfruitpertreeupdate
    if(this.state.targetfruitupdate !== 0 && this.state.targetfruitupdate !== "") dataObj.targetfruitpertree = this.state.targetfruitupdate
    
    return dataObj
  }


  render() {
    if(this.state.todisplay === null)
    {
      return (
        <View style={styles.container}>
          <NavigationBar 
              title = {{title: 'My Datasets'}}
              rightButton = {this.rightButton}
              style = {styles.navbar}
          />

          <Dialog.Container visible={this.state.dialogVisible}>
              <Dialog.Title>New Dataset</Dialog.Title>
              <Dialog.Description>Please enter the name of your dataset</Dialog.Description>
              <Dialog.Input onChangeText={entry => this.setState({entry})} value={this.state.entry} style={{color: 'black'}} />
              <Dialog.Button label="Ok" onPress={this.handleConfirm} />
              <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          </Dialog.Container>

          <FlatList
              data={this.state.entries}
              renderItem={this.renderItems}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              keyExtractor={(item) => item.name}
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
            rightButton = {{title: 'Update', handler: this.upload}}
            style = {styles.navbarS}
          />
          <Text style={styles.instructions}>Fill out all fields you would like to update</Text>
          <View style={styles.updatedataset}>
            <Text style={styles.headers}>Target Fruit per Tree</Text>
            <TextInput style={styles.input}
              keyboardType = 'number-pad'
              onChangeText={(clusters)=>this.setState({targetfruitupdate: clusters})}
            />
            <Text style={styles.headers}>Average number of clusters</Text>
            <TextInput style={styles.input}
              keyboardType = 'number-pad'
              onChangeText={(trees)=>this.setState({averagenumberclustersupdate: trees})}
            />
            <Text style={styles.headers}>Potential fruits per tree</Text>
            <TextInput style={styles.input}
              keyboardType = 'number-pad'
              onChangeText={(apples)=>this.setState({potentialfruitpertreeupdate: apples})}
            />
          </View>
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

          <ActionSheet 
              ref = {o => (this.ActionSheetUpdate = o)}
              title = {'Choose data entry mode'}
              options = {this.optionsArray}
              cancelButtonIndex = {3}
              onPress = {index => {this.actionHandlerUpdate(index)}}
          />

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
    fontSize: 30
  },
  navbarS: {
    marginTop: 40,
    width: Dimensions.get('window').width,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#618759',
    borderWidth: 1,
    fontSize:18,
    borderRadius:5
  },
  headers:{
    marginLeft: 15,
    fontSize: 18
  },
  updatedataset:{
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 15
  },
  instructions:{
    marginTop: 20, 
    textAlign:'center', 
    fontSize: 15, 
    color: 'tomato', 
    fontWeight: 'bold'
  },
});

