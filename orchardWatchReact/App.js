import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';


export default class App extends Component {

  code = ''
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
          onChangeText = {(text)=>this.setState({code: text})}
        />
        <Button
          style = {styles.submitButton}
          title = 'Submit'
          onPress = {()=>{console.log(code)}}
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

AppRegistry.registerComponent('App',()=>'App');