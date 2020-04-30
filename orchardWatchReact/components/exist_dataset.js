import React, { Component } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import NavigationBar from "react-native-navbar";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';

export default class ExistDataset extends Component {

    render() {
        return (

            <View style={styles.container}>
                <FlatList
                    
                    data={this.props.data}
                    renderItem={({item}) => <ListItem containerStyle={styles.listItem} title={item.key} subtitle={item.data} /> }
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    },
    leftButton: {
        width: 20,
        height: 20,
    },
    textStyle: {
        textAlign: 'center',
        color: '#f0f',
        fontSize: 18,
    },
    navbar: {
        marginTop: 0,
        width: Dimensions.get('window').width,
    },
    listItem: {
        backgroundColor: '#8bd483'
    }
})