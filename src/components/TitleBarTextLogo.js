import React from 'react';
import DocumentsStatusBarLogo from '../assets/documentsStatusBarLogo.svg';
import { View, StyleSheet } from 'react-native';

export const TitleBarTextLogo = props => (
    <View style={props.style}>
        <View style={styles.container}>
            <DocumentsStatusBarLogo style={styles.image} />
        </View>
    </View>
)

const styles =  StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    image: {
        resizeMode: 'contain',
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
});