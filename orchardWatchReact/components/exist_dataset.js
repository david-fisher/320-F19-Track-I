import React, { Component } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

export default class ExistDataset extends Component {

    listData = [
        {key: 'Projected Apples', data: 100 },
        {key: 'Growth Rate', data: '1 mm/day'},
        {key: 'Average Fruit Size', data: '5 cm'}
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