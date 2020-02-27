import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';

export default class Login extends Component {
    state = {
        code: -1
    }
    LoginHandler() {
        if (this.state.code === '0000') {
            this.props.navigation.navigate('Home')
        }
        else {
            alert("Incorrect Access Code")
        }
    }
    render() {
        return (
            <View style={styles.container}>
            <Image
                style = {{height: 150, width: Dimensions.get('window').width - 40}}
                source = {require('../assets/orchardWatch.png')}
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
                onPress={() => this.LoginHandler()}
            />
            </View>
        )
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
    submitButton: {
        height: 30
    }
  });