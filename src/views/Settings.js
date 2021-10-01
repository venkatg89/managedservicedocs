import React from 'react';
import { TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { Icon, TitleBar, IconFontAwesome5Pro } from '../components';
import { themes } from '../lib/theme';
import { connect } from 'react-redux';
import { settingActions }  from '../lib/redux/actions';
import { ChangePassword } from '../lib/auth/changePassword';
import VersionNumber from 'react-native-version-number';
import { Eula, PrivacyPolicy } from './';
import { withTheme } from "@callstack/react-theme-provider";

class SettingsComponent extends React.Component {
    state = { }
    
    render ()  {
        const { settings, handleNavigation, theme } = this.props;
        const  classes = style(theme);
        return (
            <>
                <TitleBar title={'Settings'} />            
                <View style={this.props.style}>
                    <View style={classes.containerView}>
                        <ScrollView>
                            <TouchableOpacity style={classes.button} onPress={() => handleNavigation(ChangePassword, 'ChangePassword')}>
                                <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"user-circle"} light />
                                <View style={classes.labelContainer}>
                                    <Text style={classes.label}>Account Profile</Text>
                                    <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={classes.button} onPress={() => { }}>
                                <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"paint-roller"} light />
                                <View style={classes.labelContainer}>
                                    <Text style={classes.label}>Background</Text>
                                    <View style={classes.themeContainer}>
                                        <TouchableOpacity style={{...classes.themeSelector, backgroundColor: themes[0].colors.background, borderColor: settings.theme === themes[0].name ? selectedColor : theme.colors.secondaryContrast }} onPress={() => this.updateTheme(themes[0].name)}></TouchableOpacity>
                                        <TouchableOpacity style={{...classes.themeSelector, backgroundColor: themes[1].colors.background, borderColor: settings.theme === themes[1].name ? selectedColor : theme.colors.secondaryContrast }} onPress={() => this.updateTheme(themes[1].name)}></TouchableOpacity>
                                        <TouchableOpacity style={{...classes.themeSelector, backgroundColor: themes[2].colors.background, borderColor: settings.theme === themes[2].name ? selectedColor : theme.colors.secondaryContrast }} onPress={() => this.updateTheme(themes[2].name)}></TouchableOpacity>
                                        <TouchableOpacity style={{...classes.themeSelector, backgroundColor: themes[3].colors.background, borderColor: settings.theme === themes[3].name ? selectedColor : theme.colors.secondaryContrast }} onPress={() => this.updateTheme(themes[3].name)}></TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={classes.button} onPress={() => handleNavigation(Eula, 'Eula')}>
                                <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"handshake-alt"} light/>
                                <View style={classes.labelContainer}>
                                    <Text style={classes.label}>End User License Agreement</Text>
                                    <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={classes.button} onPress={() => handleNavigation(PrivacyPolicy, 'PrivacyPolicy')}>
                                <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"user-lock"} light/>
                                <View style={classes.labelContainer}>
                                    <Text style={classes.label}>Privacy Policy</Text>
                                    <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={classes.infoTextView}>
                            <Text style={classes.infoText}>Copyright 2019 J. J. Keller & Associates, Inc.</Text>
                            <Text style={classes.infoText}>App Version: {VersionNumber.appVersion}</Text>
                        </View>
                    </View>
                </View>
            </>
        );
    }

    updateTheme = newTheme => {
        this.props.saveSetting('theme', newTheme);
    }
}

// const Settings = withTheme(SettingsComponent);
// export { Settings };

export { SettingsComponent };