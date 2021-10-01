import React from 'react';
import DocumentsScreenHeader from '../assets/documents_Options_ScreenHead.svg';
import { View, StyleSheet } from 'react-native';

export const TextLogo = props => (
    <View style={props.style}>
        <View style={styles.container}>
            <DocumentsScreenHeader style={styles.image} />
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