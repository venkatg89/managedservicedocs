import React from 'react';

import { TitleBarTextLogo } from './';
import { View, Text } from 'react-native';
// import { withTheme } from "@callstack/react-theme-provider";

const style =  theme => ({
    container : {
        height: 50,
        zIndex: 1000,
        backgroundColor: '#E6E9F1',
        //color: theme.colors.titleBarText,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    logo: {
        height: 30,
        width: 100,
        right: 0,
        position: 'absolute'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        left: 10,
        height: 30,
        width: 120,
        position: 'absolute'
    }
});

const TitleBarComponent = props => {
    const  classes = style(props.theme);
    return (
    <View style={classes.container}>
        <View style={classes.button}>{props.button}</View>
        <Text style={classes.title}>{props.title}</Text>
        <TitleBarTextLogo style={classes.logo} />
    </View>
)};

// const TitleBar = withTheme(TitleBarComponent);
// export { TitleBar };

export { TitleBarComponent };