import React from 'react';
import { TouchableOpacity, Image, Modal, View, Dimensions, StyleSheet } from 'react-native';
import { Icon } from './Icon.js';
import { RNCarousel } from './Carousel.js';

export class Thumbnail extends React.Component {
    state = { 
        fullView: false, 
        width: (Dimensions.get('window').width * 75) / 100, 
        height: (Dimensions.get('window').height * 75) / 100
    }

    viewLayout = (layout) => {
        const { width, height } = layout;
        this.setState({ width: (width * 75) / 100, height: (height * 75) / 100 });
    }

    render() {
        const { fullView, width, height } = this.state;
        const { style } = this.props;
        let { images } = this.props;

        if (!Array.isArray(images)) {
            images = [ images ];
        }  
        
        return(         
            <>
                <TouchableOpacity                            
                    style={{...style, ...styles.thumbnail}}
                    onPress={() => this.setState({ fullView: true})}>
                    { images.length > 1 ? <Icon name='images' style={styles.imagesIcon} size={30} /> : <></> }
                    <Image source={{uri: 'data:image/png;base64,' + images[0]}} style={styles.image}/>                      
                </TouchableOpacity>

                <Modal 
                    animationType={"fade"} 
                    transparent={true}
                    visible={fullView}
                    onRequestClose= {() => {}}
                    supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}>               
                    <View style={styles.modal} onLayout={ (event) => { this.viewLayout(event.nativeEvent.layout) }}>
                        <View style={{height: height}}>
                            <Icon name='close-circle-outline' style={styles.close} size={50} onPress={() => this.setState({fullView: false})}/>
                            <RNCarousel
                                data={images} 
                                width={width}
                            />
                        </View>
                    </View>
                </Modal>
            </>
        )    
    }
}

const styles =  StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    imagesIcon: {
        color: '#738CBF',
        position: 'absolute',
    },
    close: {
        color: 'red',
        position: 'absolute',
        zIndex: 9999
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});