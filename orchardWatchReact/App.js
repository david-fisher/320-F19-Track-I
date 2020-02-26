import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, Linking } from 'react-native';



export default class App extends Component {

  state = {
    code: -1
  }
  LoginHandler() {
    if (this.state.code === '0000') {
      
    }
    else {
      alert("Incorrect Access Code")
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style = {{height: 200, width: Dimensions.get('window').width - 40}}
          source = {require('./assets/orchardWatch.png')}
        />
        <TextInput 
          style = {styles.inputBox}
          placeholder = 'Access Code'
          secureTextEntry = {true}
          keyboardType = 'number-pad'
          textAlign = {'center'}
          placeholderTextColor = {'gray'}
          onChangeText = {(code)=>this.setState({code})}
        />
        <Button
          style = {styles.submitButton}
          title = 'Submit'
          onPress = {()=>this.LoginHandler()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40, 
    width: Dimensions.get('window').width - 40, 
    borderColor: 'black', 
    borderWidth: 1,
  },
});

AppRegistry.registerComponent('App',()=>App);
