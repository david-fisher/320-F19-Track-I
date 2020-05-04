import React, { Component, Fragment } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import NavigationBar from "react-native-navbar";
import Dialog from 'react-native-dialog';
import axios from "axios";


export default class Gallery extends Component {
    state = {
        image: null,
        dialogVisible: false,
        entry: ''
    }

    componentDidMount() {
        this.getPermissionAsync();
        this._pickImage();
    }

    getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1
        });
        if (!result.cancelled) {
            this.setState({ image: result });
            // alert(JSON.stringify(result))
        }
        else {
            this.props.navigation.navigate('CameraPage')
        }
    };

    upload = () => {
        this.setState({dialogVisible: true})
    }

    handleCancel = () => {
        this.setState({dialogVisible: false})
    }

    handleConfirm = () => {
        if (this.state.entry === '') {
            alert('Please Enter cluster number')
            return
        }
        var data = new FormData()
        // data.append('clust_num',1)
        data.append('cluster_img',{
            uri: this.state.image.uri,
            type: 'image/jpg',
            name: 'x.jpg'
        })
        fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/ml/cluster/1',{
            method: 'POST',
            // headers: {
            //     Accept: "*/*",
            //     "Content-Type": "multipart/form-data"
            // },
            body: data
        }).then(res => {
            // if (res.status === 200) {
            //     alert('Image successfully uploaded')
            // }
            // else {
            //     // alert(res.status)
            //     res.json().then(json => {
            //         alert(JSON.stringify(json))
            //     })
            // }
            alert('Image successfully uploaded')
        })
        .catch(err => {alert(err)})
        // this.props.navigation.navigate('Home')
        this.setState({dialogVisible: false})

    }

    render() {
        let { image } = this.state;

        return (
            <Fragment>
                <View>
                    <NavigationBar
                        title = {{title: "Upload Image"}} 
                        style = {styles.navbar}
                        leftButton = {{title: '< Back', handler: () => this.props.navigation.navigate('CameraPage')}}
                        rightButton = {{title: 'Upload', handler: this.upload}}
                    />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    
                    {image &&
                    <Image source={image} style={styles.image} resizeMode = 'contain'/>}
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Cluster ID</Dialog.Title>
                        <Dialog.Description>Please enter the cluster id for the image</Dialog.Description>
                        <Dialog.Input onChangeText={entry => this.setState({entry})} value={this.state.entry} style={{color: 'black'}} />
                        <Dialog.Button label="Ok" onPress={this.handleConfirm} />
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    </Dialog.Container>
                </View>
                
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        marginTop: 40,
        width: Dimensions.get('window').width,
        height: 40
    },
    image: {
        width: Dimensions.get('window').width,
        marginTop: 10,
        height: Dimensions.get('window').height - 100
    }
})