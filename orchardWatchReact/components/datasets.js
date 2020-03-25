import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import NavigationBar from "react-native-navbar";


export default class Datasets extends Component {
    
    render() {
        return (
            <View>
                <NavigationBar 
                title = {{title: 'Datasets'}}
                rightButton = {{title: '+'}}
                style = {styles.navbar}
                // tintColor = {'black'}
                />
                {/* <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>This is still a test</Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        marginTop: 40,
        width: Dimensions.get('window').width
    }
})
