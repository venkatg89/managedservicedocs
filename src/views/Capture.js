import React from 'react';
import { View, Text, Platform } from 'react-native';
import { AbbyyCameraViewManager, EventEmitter, Slide, Thumbnail, AbbyyCamera, Button } from '../components';
import { asyncComponent } from '../lib/utils/asyncComponent.js';
import { Submit } from './';
import { withTheme } from "@callstack/react-theme-provider";
// import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS, openSettings } from "react-native-permissions";

const AsyncAbbyyCamera = asyncComponent(() => (
    import ('../components/AbbyyCamera.js')
));

const style = theme => ({ 
    container: {
        padding: 5,
        flex: 1,
        backgroundColor: theme.colors.background
    },
    box: {
        borderColor: 'yellow',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
        flex: 1
    },
    label: {
        color: 'white',
    },
    image: {
        width:'75%',
        height: '50%',
        zIndex: 3
    },
    resultOverlay: {
        position: 'absolute',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        top: 0,
        backgroundColor: theme.colors.background
    },
    button: {
        width: '30%',
        flex: 1,
        marginBottom: 1
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '100%'
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    text: {
        color: theme.colors.contrast
    }
});

class CaptureComponet extends React.Component {
    state = { image: undefined, yesOption: false, multipleImages: [], cameraPermission: true };

    componentWillMount() {
        EventEmitter.addListener('onImageCaptured', this.onImageCaptured);
    }

    componentWillUnmount() {
        EventEmitter.removeListener('onImageCaptured', this.onImageCaptured);
    }
    
    componentDidMount() {
        // check(Platform.OS === 'ios' ? IOS_PERMISSIONS.CAMERA : ANDROID_PERMISSIONS.CAMERA).then(result => {
        //     switch (result) {
        //       case RESULTS.UNAVAILABLE:
        //       case RESULTS.DENIED:
        //       case RESULTS.NEVER_ASK_AGAIN:
        //         this.setState({ cameraPermission: false });
        //         break;
        //     case RESULTS.GRANTED:
        //         this.setState({ cameraPermission: true });
        //         break;
        //     }
        //   });
    }

    render() {
        let { image, imageLoading, yesOption, multipleImages, cameraPermission } = this.state;
        let { theme } = this.props;
        const classes = style(theme);
        return (
            <View style={{...this.props.style, ...classes.container}}>
                <View style={classes.box}>
                    { cameraPermission ?
                        <AbbyyCamera style={{height: '100%', width: '100%'}} quality={20}/>
                        : 
                        <>
                            <Text style={classes.label}>Your camera is disabled.</Text>
                            <Text style={classes.label}>Please go to device settings to enable camera.</Text>
                            <Button title='Open Documents Device Settings' style={classes.button} onPress={this.openDocumentsDeviceSettings}/>
                        </>
                    }
                    { image || imageLoading ?
                        (<Slide style={classes.resultOverlay}>
                            <Thumbnail images={image} style={classes.image} />
                            <View style={classes.buttonContainer}>                           
                                { !yesOption ? this.renderImageConfirmation() : this.renderPageConfirmation() }
                            </View>
                        </Slide>
                     ) : null }
                     
                </View>
            </View>
        )
    }

    openDocumentsDeviceSettings = () => {
        //openSettings().catch(() => console.warn("cannot open settings"));
    }

    renderImageConfirmation = () => {
        const classes = style(this.props.theme);

        return (
        <>
            <Text style={classes.label}>Use this image?</Text>
            <View style={classes.rowContainer}>
                <Button title='Yes' style={classes.button} onPress={this.imageYes} />
                <Button title='No' style={classes.button} onPress={()=>{ this.setState({image: undefined}); AbbyyCameraViewManager.startCapture() }} />
            </View>
        </>
        )
    }
    
    renderPageConfirmation = () => {
        let { multipleImages } = this.state;
        const  classes = style(this.props.theme);

        const allowMorePages = multipleImages.reduce((a, c) => (a + c.length), 0) < 270000;

        return (
        <View style={classes.columnContainer}>
            <Button title='Done' style={classes.button} onPress={this.imageApproved} />
            { allowMorePages ? <Button title='Add more pages' style={classes.button} onPress={this.addPages} /> : <Text style={classes.text}>Maximum document size reached.</Text>  }
        </View>
        )
    }

    onImageCaptured = (event) => {
        if (event != null){
            this.setState({ image: event.data, imageLoading: false });
        }
        else 
            this.setState({ imageLoading: true })
    }

    imageYes = () => {
        this.setState({ yesOption: true });
    }

    addPages = () => {
        let { multipleImages, image } = this.state;
        let newImages = multipleImages;
        newImages.push(image);
        this.setState({ image: undefined, yesOption: false, multipleImages: newImages });
        AbbyyCameraViewManager.startCapture();
    }

    imageApproved = () => {
        if (!this.props.handleNavigation)
            return;

        let { images = [], image, multipleImages } = this.state;

        if (multipleImages.length > 0) {
            multipleImages.push(image);
            images = multipleImages;
        } else {
            images.push(image);
        }
        
        this.setState({images, image: undefined, yesOption: false}); // update the image list and reset the captured image

        this.props.handleNavigation(Submit, 'Submit', { images: images });
    }
}

const Capture = withTheme(CaptureComponet);
export { Capture };