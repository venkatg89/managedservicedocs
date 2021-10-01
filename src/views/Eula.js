import React from 'react';
import { View, ScrollView } from 'react-native';
import { withTheme } from "@callstack/react-theme-provider";
import { TitleBar, Icon, EulaText } from '../components';
import { Settings } from './';

const style = theme => ({
    titleBar: {
        color: '#157EFB',
    },
    scrollViewContainer: {
        padding: 10
    }
});

const arrowSize = 25;

class EulaComponent extends React.Component {
    render() {
        const { handleNavigation, theme } = this.props;
        const classes = style(theme);
        return (
            <>
                <TitleBar title={'EULA'} button={ <Icon name='arrow-back' style={classes.titleBar} size={arrowSize} onPress={() => handleNavigation(Settings, 'Settings')}> Settings</Icon>} />         
                <View style={this.props.style}>
                    <ScrollView style={classes.scrollViewContainer}>
                        <EulaText handleNavigation={handleNavigation}/>
                    </ScrollView>
                </View>
            </>         
        )
    }
}

const Eula = withTheme(EulaComponent);
export { Eula };