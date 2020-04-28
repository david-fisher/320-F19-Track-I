import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import t from 'tcomb-form-native';
import NavigationBar from "react-native-navbar";
import Constants from 'expo-constants';

// const Form  = t.form.Form
// var Data = t.struct({
//     numberOfClusters: t.Number,
//     numberOfTrees: t.Number,
//     projectedApples: t.Number
// })

export default class TableEntry extends Component{
    state = {
      targetfruitpertree: 0,
      averagenumberclusters: 0,
      potentialfruitpertree: 0,
      location: '',
      lastUpdated: ''
    }

    upload = async () => {
      var problems = this.verify()
      if(problems.length === 0){
        // alert("Successfully uploaded data")
        fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/orchards',
        {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.makeData())
        })
        // .then(response => {console.log(response)})
        .then(response => {alert(response)})
        this.props.navigation.navigate("Home")
      }else{
        var msg = ""
        for (var i=0; i<problems.length; i++){
          msg += problems[i] + "\n"
        }
        alert(msg)
      }
    }

    makeData() {
      return {
        name: this.props.route.params.name,
        lastUpdated: this.props.route.params.data,
        location: this.state.location,
        targetFruitPerTree: this.state.targetfruitpertree,
        averageNumberOfClusters: this.state.averagenumberclusters,
        potentialFruitPerTree: this.state.potentialfruitpertree
      }
    }

    verify = (location = this.state.location, numClusters = this.state.targetfruitpertree, numTrees=this.state.averagenumberclusters, projApples=this.state.potentialfruitpertree) => {
      var problemsArr = []

      if (location.length===0 || location === ' ') problemsArr.push("Enter a valid location")
      if (numClusters === 0) problemsArr.push("Add a number of clusters")
      if(numTrees === 0) problemsArr.push("Add a number of trees")
      if(projApples === 0) problemsArr.push("Add a projected number of apples")
      
      return problemsArr
    }

    render() {
        return (
          <View style={styles.container}>
            <NavigationBar 
                title={{title: 'New Dataset'}}
                leftButton={{title: '< Back', handler: () => {this.props.navigation.navigate('Home')}}}
                rightButton={{title: 'Upload', handler: this.upload}}
            />
            {/* <Form type={Data}
             /> */}
             <Text style={styles.headers}>Location</Text>
             <TextInput style={styles.input}
                // placeholder="Location"
                onChangeText={(loc)=>this.setState({location: loc})}
             />
             <Text style={styles.headers}>Target Fruit per Tree</Text>
             <TextInput style={styles.input}
                // placeholder="Target Fruit per Tree"
                keyboardType = 'number-pad'
                onChangeText={(clusters)=>this.setState({targetfruitpertree: clusters})}
             />
             <Text style={styles.headers}>Average number of clusters</Text>
             <TextInput style={styles.input}
                // placeholder="Average number of clusters"
                keyboardType = 'number-pad'
                onChangeText={(trees)=>this.setState({averagenumberclusters: trees})}
             />
             <Text style={styles.headers}>Potential fruits per tree</Text>
             <TextInput style={styles.input}
                // placeholder="Potential fruits per tree"
                keyboardType = 'number-pad'
                onChangeText={(apples)=>this.setState({potentialfruitpertree: apples})}
             />
          </View>
        );
      }
}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: Constants.statusBarHeight,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#ffffff',
    },
    input: {
      margin: 15,
      height: 40,
      borderColor: '#90EE90',
      borderWidth: 1
    },
    headers:{
      marginLeft: 15
    }
  });