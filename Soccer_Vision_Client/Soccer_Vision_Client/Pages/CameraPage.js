import React from 'react'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity } from 'react-native'

class CameraPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            picUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    btnSnap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ quality: 0.2 });
            this.setState({ photoUri: photo.uri });
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{
                    flex: 1, width: 200, margin: 10,
                    justifyContent: 'flex-end', borderColor: 'black', borderWidth: 1
                }}>
                    <Camera
                        ref={ref => { this.camera = ref; }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
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
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }
    }

}

export default CameraPage;