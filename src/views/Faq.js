import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Icon, IconFontAwesome5Pro, TitleBar } from '../components';
import { withTheme } from "@callstack/react-theme-provider";
import { Faqs } from './';

const iconSize = 30;
const arrowSize = 25;

const style = theme => ({
    view: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    viewText: {
        flexDirection: 'row',
    },
    icon: {
        padding: 5,
        color: '#738CBF',
        width: 45,
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
    textContainer: {
        height: '100%',
        flex: 1,
    },
    titleBar: {
        color: '#157EFB',
    }
});

class FaqComponent extends React.Component {
    render() { 
        const { handleNavigation, label, text, theme } = this.props;
        const  classes = style(theme);
        return (
            <>
                <TitleBar title={'FAQs'} button={ <Icon name='arrow-back' style={classes.titleBar} size={arrowSize} onPress={() => handleNavigation(Faqs, 'FAQs')}> FAQs</Icon>} />
                <View style={this.props.style}>
                    <ScrollView>
                        <View style={classes.view}>
                            <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"question-circle"} light />
                            <View style={classes.labelContainer}>
                                <Text style={classes.label}>{label}</Text>
                            </View>
                        </View>
                        <View style={classes.viewText}>
                            <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"lightbulb-on"} light />
                            <View style={classes.textContainer}>
                                {text}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </>
        );
    }
}

const Faq = withTheme(FaqComponent);
export { Faq };