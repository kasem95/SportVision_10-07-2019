import React from 'react'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Button, Text } from 'native-base';
import { observer, inject } from 'mobx-react';

const { height, width } = Dimensions.get('window')

class CameraPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            photoUri: null,
            zoom: 0
        };

        
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                quality: 0.7,
            });
            this.setState({ photoUri: photo.uri });
            console.log(this.state.photoUri)
        }
    };

    btnOpenGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        console.log(result);
        if (!result.cancelled) {
            this.setState({ photoUri: result.uri });
        }
    };

    zoomUp = () => {
        if (this.state.zoom < 1) {
            this.setState(prevState => ({ zoom: prevState.zoom + 0.1 }))
        }
    }

    zoomDown = () => {
        if (this.state.zoom > 0) {
            this.setState(prevState => ({ zoom: prevState.zoom - 0.1 }))
        }
    }

    confirm = () => {
        this.props.rootStore.UserStore.changePhotoURI(this.state.photoUri)
        this.props.navigation.navigate('SignUpPage')
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            if (this.state.photoUri === null) {
                return (
                    <View style={{ flex: 1 }}>
                        <Camera
                            style={{ flex: 1, width: width, height: height }}
                            type={this.state.type} ref={ref => this.camera = ref}
                            ratio={"16:9"}
                            zoom={this.state.zoom}
                            on>
                            <TouchableOpacity style={{ marginRight: 100, marginTop: 150 }} onPress={this.zoomUp}>
                                <Image style={{ width: 30, height: 30, backgroundColor: 'transparent' }} source={require('../assets/zoomin.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 160, marginRight: 100 }} onPress={this.zoomDown}>
                                <Image style={{ width: 30, height: 30, backgroundColor: 'transparent' }} source={require('../assets/zoomout.png')}
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                }}>

                                <TouchableOpacity
                                    style={{
                                        flex: 0.2,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            type:
                                                this.state.type === Camera.Constants.Type.back
                                                    ? Camera.Constants.Type.front
                                                    : Camera.Constants.Type.back,
                                        });
                                    }}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.8, alignSelf: 'flex-end', alignItems: 'center', marginBottom: 20 }} onPress={this.btnSnap}>
                                    <Image style={{ width: 70, height: 70 }} source={require('../assets/capture.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        flex: 0.2,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={this.btnOpenGalery}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1, width: width, height: height}} source={{ uri: this.state.photoUri }}>
                            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', }}>
                                <Button
                                bordered
                                success
                                rounded
                                    style={{
                                        flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={this.confirm}
                                >
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>CONFIRM</Text>
                                </Button>
                                <Button
                                bordered
                                danger
                                rounded
                                    style={{
                                        flex: 1,
                                        alignSelf: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => this.setState({ photoUri: null })}>
                                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>CANCEL</Text>
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>
                );
            }
        }
    }

}

export default inject('rootStore')(observer(CameraPage));