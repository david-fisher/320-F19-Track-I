import React, { Component } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import NavigationBar from "react-native-navbar";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';

export default class ExistDataset extends Component {

    state = {
        projApples: 0,
        growthRate: 0,
        avgSize: 0
    }

    listData = [
        {key: 'Projected Apples', data: this.state.projApples },
        {key: 'Growth Rate', data: this.state.growthRate + ' mm/day'},
        {key: 'Average Fruit Size', data: this.state.avgSize + ' cm'}
      ]

    render() {
        return (

            <View style={styles.container}>
                <FlatList
                    
                    data={this.listData}
                    renderItem={({item}) => <ListItem containerStyle={styles.listItem} title={item.key + ": " + item.data} /> }
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