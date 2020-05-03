import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image,AsyncStorage,TouchableWithoutFeedback, Keyboard } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import { Cookies } from "react-cookie";
import GradientButton from 'react-native-gradient-buttons';

// const cookies = new Cookies()

export default class Login extends Component {
    state = {
        code: ''
    }
    

    async completeLogin(response) {
        if (response.auth_result === 1) {
            try {
                    await AsyncStorage.setItem('authenticated','true')
                    this.props.navigation.navigate('Home')
                } catch (error) {
                    alert(error)
            }
        }
        else {
            alert('Invalid access code')
        }
    }

    LoginHandler = async () => {
        fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/authentication?authentication_token='+this.state.code, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((json) => this.completeLogin(json))
        .catch((error) => alert(error))
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Image
                        style={styles.img}
                        resizeMode='cover'
                        source={require('../assets/orchardbg.jpg')} 
                        blurRadius={4}
                    />
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
                        placeholderTextColor = {'white'}
                        selectionColor={'white'}
                        onChangeText = {(code)=>this.setState({code})}
                    />
                    <GradientButton
                        style={{marginTop: 20}}
                        gradientBegin='#d44e4e'
                        gradientEnd='#bf5252'
                        gradientDirection='diagonal'
                        text = 'Submit'
                        height={45}
                        width={155}
                        impact
                        impactStyle='Light'
                        textStyle={{fontSize: 18}}
                        onPressAction={this.LoginHandler}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#90EE90',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: Dimensions.get('window').height/6
    },
    inputBox: {
      height: 50, 
      width: Dimensions.get('window').width - 225, 
      borderColor: 'white',
      borderBottomWidth: 2,
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      color: 'white', 
      borderWidth: 1,
      borderRadius: 15
    },
    submitButton: {
        height: 30,
        width: 80
    },
    img: {
        position: 'absolute',
    }
  });