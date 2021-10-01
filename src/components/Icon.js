import React from 'react';
import { Platform } from 'react-native';
import BaseIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';

export const Icon = ({name, ...props}) => (
    <BaseIcon name={Platform.OS === "ios" ? `ios-${name}` : `md-${name}`}
        {...props} />
)

export const IconFontAwesome5Pro = ({name, ...props}) => (
    <FontAwesome5Pro name={name} light {...props} />
)