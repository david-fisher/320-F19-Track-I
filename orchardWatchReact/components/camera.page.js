import React, { Fragment } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import { Component } from 'react';
import Toolbar from './toolbar.component';
import Constants from "expo-constants";
import NavigationBar from "react-native-navbar";
import Dialog from 'react-native-dialog';



export default class CameraPage extends Component {
    camera = null;
    state = {
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
        imageUri: null,
        dialogVisible: false,
        entry: ''
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

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

    // upload = () => {
    //     alert("Successfully uploaded image")
    //     this.setState({
    //         imageUri: null
    //     })
    //     // fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/aprilTag-allignment',{
    //     //     method: 'POST',
    //     //     body: this.state.imageUri
    //     // }).then(res => {alert(res.status)})
    // }
    upload = () => {
        this.setState({dialogVisible: true})
    }

    handleCancel = () => {
        this.setState({dialogVisible: false})
    }

    handleConfirm = async () => {
        if (this.state.entry === '') {
            alert('Please Enter cluster number')
            return
        }
        var data = new FormData()
        // data.append('clust_num',1)
        data.append('cluster_img',{
            uri: this.state.imageUri.uri,
            type: 'image/jpg',
            name: 'image.jpg'
        })
        // fetch('https://2a2glx2h08.execute-api.us-east-2.amazonaws.com/default/ml/cluster/'+this.state.entry,{
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     },
        //     body: data
        // }).then(res => {
        //     if (res.status === 200) {
        //         alert('Image successfully uploaded')
        //     }
        //     else {
        //         alert('Image could not be uploaded')
        //     }
        // })
        // .catch(err => {alert(err)})
        alert('Bad Image Upload Unsuccessful')
        this.setState({dialogVisible: false})
        this.setState({imageUri: null})
        this.setState({entry: ''})
    }

    gallery = () => {
        this.props.navigation.navigate('Gallery')
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
        const { imageUri } = this.state;

        if (imageUri !== null) {
            return (
                <Fragment>
                    <ImageBackground 
                        source = {imageUri}
                        style = {styles.previewPic}
                    />
                    <NavigationBar 
                        title = {{title: 'Camera'}}
                        leftButton = {{title: "< Back", handler: this.backBtn}}
                        rightButton = {{title: "Upload", handler: this.upload}}
                        style = {styles.navbar}
                    />
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>Cluster ID</Dialog.Title>
                        <Dialog.Description>Please enter the cluster id for the image</Dialog.Description>
                        <Dialog.Input onChangeText={entry => this.setState({entry})} value={this.state.entry} style={{color: 'black'}} />
                        <Dialog.Button label="Ok" onPress={this.handleConfirm} />
                        <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    </Dialog.Container>
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
                    <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.previewCam}
                        ref={camera => this.camera = camera}
                    />
                </View>
                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onShortCapture={this.handleShortCapture}
                    gallery={this.gallery}
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
        marginTop: 40,
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
});