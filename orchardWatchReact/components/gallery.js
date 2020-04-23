import React, { Component, Fragment } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, TextInput, Dimensions, Button, Image, StatusBar, Alert } from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import NavigationBar from "react-native-navbar";

export default class Gallery extends Component {
    state = {
        image: null
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
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
        else {
            this.props.navigation.navigate('CameraPage')
        }
    };

    upload = () => {
        // data = new FormData()
        // data.append('clust_num',1)
        // data.append('clust_img',this.state.image.uri)
        fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/aprilTag-allignment',{
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: {
                clust_num: 1,
                clust_img: this.state.image.uri
            }
        }).then(res => {
            if (res.status === 200) {
                alert('Image successfully uploaded')
            }
            else {
                alert('Error uploading image')
            }
        })
        .catch(err => {alert(err)})
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
                    <Image source={{ uri: image }} style={styles.image} resizeMode = 'contain'/>}
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