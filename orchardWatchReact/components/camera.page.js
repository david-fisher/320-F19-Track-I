import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import { Component } from 'react';


export default class CameraPage extends Component {
    camera = null;

    state = {
        hasCameraPermission: null,
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return (<View />);
        } else if (hasCameraPermission === false) {
            return (<Text>Access to camera has been denied.</Text>);
        }
        else{
            return (
                <View>
                    <Camera
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    preview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }
});