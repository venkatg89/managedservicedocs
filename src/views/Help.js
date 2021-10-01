import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, IconFontAwesome5Pro, requestPhonePermission, TitleBar } from '../components';
import { Linking } from 'react-native'
import { withTheme } from "@callstack/react-theme-provider";
import { Faqs } from './';

const supportEmail = 'MSMobileAppSupport@jjkeller.com';
const supportEmailSubject = 'Managed Services Mobile App Support';
const supportPhoneNumber = '1-833-813-7264'
const iconSize = 30;
const arrowSize = 25;

const style = theme => ({
    button: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    icon: {
        padding: 5,
        color: '#738CBF',
        width: 45,
        alignSelf: 'center'
    },
    label: {
        color: theme.colors.contrast,
        flex: 1
    },
    labelContainer: {
        borderColor: theme.colors.secondaryContrast,
        borderBottomWidth: 1,
        height: '100%',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    arrow: {
        color: theme.colors.secondaryContrast,
        padding: 5
    },
    mirror: {
        transform:[{scaleX: -1}]
    }
});

class HelpComponent extends React.Component {
    render() { 
        const { handleNavigation, theme } = this.props;
        const  classes = style(theme);
        return (
            <>
                <TitleBar title={'Help'} />
                <View style={this.props.style}>
                        <TouchableOpacity style={classes.button} onPress={() => { requestPhonePermission(); Linking.openURL(`tel:${supportPhoneNumber}`) }}>
                            <IconFontAwesome5Pro style={[classes.icon, classes.mirror]} size={iconSize} name={"phone"} light />
                            <View style={classes.labelContainer}>
                                <Text style={classes.label}>Call J.J. Keller Support</Text>
                                <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.button} onPress={() => Linking.openURL(`mailto:${supportEmail}?subject=${supportEmailSubject}`)}>
                            <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"envelope"} light />
                            <View style={classes.labelContainer}>
                                <Text style={classes.label}>e-mail J.J. Keller Support</Text>
                                <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={classes.button} onPress={() => handleNavigation(Faqs, 'Faqs')}>
                            <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"question-circle"} light />
                            <View style={classes.labelContainer}>
                                <Text style={classes.label}>FAQs</Text>
                                <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                            </View>
                        </TouchableOpacity>
                </View>
            </>
        );
    }
}

const Help = withTheme(HelpComponent);
export { Help };