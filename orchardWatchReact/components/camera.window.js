import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import { Component } from 'react';
import Toolbar from './toolbar.window';
import Constants from "expo-constants";
import NavigationBar from "react-native-navbar";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSwitchNavigator} from '@react-navigation/stack';
import Gallery from "./gallery";


export default class CameraWindow extends Component {
    camera = null;
    state = {
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        imageUri: null
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });
    gallery = () => {
        this.props.navigation.navigate('Gallery')
    }

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ imageUri: photoData });
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    backBtn = () =>  {
        this.setState({
            imageUri: null
        })
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
        const { imageUri } = this.state;

        //for box
        const { height, width } = Dimensions.get('window');
        const maskRowHeight = Math.round((height - 300) / 20);
        const maskColWidth = (width - 300) / 2;



        if (imageUri !== null) {
            return (
                <Fragment>
                    <ImageBackground 
                        source = {imageUri}
                        style = {styles.previewPic}
                    />
                    <NavigationBar 
                        title = {{title: 'Datasets'}}
                        leftButton = {{title: "< Back", handler: this.backBtn}}
                        rightButton = {{title: "Upload", handler: this.backBtn}}
                        style = {styles.navbar}
                    />
                </Fragment>
            );
        }
        else if (hasCameraPermission === null) {
            return (<View />);
        } else if (hasCameraPermission === false) {
            return (<Text>Access to camera has been denied.</Text>);
        }
        else{
            return (
                <Fragment>
                    <NavigationBar
                        leftButton = {{title: "< Back", handler: () => {this.props.navigation.navigate('Home')}}}
                        style = {styles.navbar}
                    />
                    <View>
                        <Camera
                            type={cameraType}
                            flashMode={flashMode}
                            style={styles.previewCam}
                            ref={camera => this.camera = camera}
                        />
                    </View>

                    {/* for box */}
                    <View style={styles.maskOutter}>
                        <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
                        <View style={[{ flex: 30 }, styles.maskCenter]}>
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        <View style={styles.maskInner} />
                        <View style={[{ width: maskColWidth }, styles.maskFrame]} />
                        </View>
                        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
                    </View>


                    <Toolbar 
                        capturing={capturing}
                        flashMode={flashMode}
                        cameraType={cameraType}
                        setFlashMode={this.setFlashMode}
                        onCaptureIn={this.handleCaptureIn}
                        onCaptureOut={this.handleCaptureOut}
                        onShortCapture={this.handleShortCapture}
                        gallery = {this.gallery}
                    />
                </Fragment>
            );
        }
    }
};

const styles = StyleSheet.create({
    previewCam: {
        height: Dimensions.get('window').height-225,
        width: Dimensions.get('window').width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    navbar: {
        marginTop: 40,
        width: Dimensions.get('window').width,
        height: 40
    },
    previewPic: {
        height: Dimensions.get('window').height-225,
        width: Dimensions.get('window').width,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        marginTop: 125,
    },

    // for box
    maskOutter: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: Dimensions.get('window').height-225,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      maskInner: {
        width: 300,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
      },
      maskFrame: {
        backgroundColor: 'rgba(1,1,1,0.6)',
      },
      maskRow: {
        width: '100%',
      },
      maskCenter: { flexDirection: 'row' },
});