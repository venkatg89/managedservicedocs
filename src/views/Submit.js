import React from 'react';
import { View } from 'react-native';
import { withTheme } from "@callstack/react-theme-provider";
import { documents, documentTypes, statuses } from '../lib/dataAccess';
import { Thumbnail, Button } from '../components';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';

const style = theme => ({
    image: {
        height: '60%',
        width: '90%'
    },
    container: {
        alignItems: 'center'
    },
    imageContainer: {
        flexDirection: 'row'
    },
    picker: {
        width: '80%',
        backgroundColor: theme.colors.secondaryContrast,
    },
    label: {
        color: theme.colors.contrast
    },
    submitForm: {
        minHeight: 150,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: 300
    },
    buttonContainer: {
        width: 300,
        flexDirection: 'column',
        justifyContent: 'space-around',
        minHeight: 120
    },
    submitButton: {
        width: '100%',
        paddingBottom: '1em'
    },
    cancelButton: {
        ...this.submitButton
    }
});

// @connect(store => ({
//     types: store.documentTypes.list,
// }))
class SubmitComponent extends React.Component {
    state = {
        defaultType: { name: '' },
        documentType: { name: '' },
        defaultStatus: { name: '' }
    }

    componentWillMount() {
        documentTypes.read().then(documentTypes => { 
            const defaultType = documentTypes.filter(dt => dt.isDefault)[0];
            this.setState({ defaultType, documentType: defaultType })
        });

        statuses.read().then(statuses => {
            const defaultStatus = statuses.filter(st => (st.isDefault))[0];
            this.setState({ defaultStatus })
        });
    }

    render() {
        const { images, types = [], theme } = this.props;
        const { documentType } = this.state;
        const classes = style(theme);
        const pickerClasses = pickerSelectStyle(theme);
        
        return(
            <View style={{...this.props.style, ...classes.container}}>
                <View style={classes.imageContainer}>
                    <Thumbnail images={images} style={classes.image} />
                </View>
                <View style={classes.submitForm}>
                    <RNPickerSelect 
                        value={ documentType }
                        items={ types.map((d, i) => ({ label: d.name, value: d, key: i, color: 'black'})).sort((a, b) => { return (a.label > b.label ? 1 : -1)})} 
                        onValueChange={ documentType => this.setState({ documentType }) }
                        style={{...pickerClasses, iconContainer: {
                            top: 20,
                            right: 10,
                        }}}
                        useNativeAndroidPickerStyle={true}
                        Icon={() => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        borderTopWidth: 10,
                                        borderTopColor: 'gray',
                                        borderRightWidth: 10,
                                        borderRightColor: 'transparent',
                                        borderLeftWidth: 10,
                                        borderLeftColor: 'transparent',
                                        width: 0,
                                        height: 0,
                                    }}
                                />
                            );
                        }}
                    />
                    <View style={classes.buttonContainer}>
                        <Button title='Submit'
                            style={classes.submitButton}
                            color={theme.colors.defaultAction}
                            onPress={this.submit}
                            disabled={(!this.state.documentType || this.state.documentType.name === '')}/>
                        <Button title='Cancel'
                            style={classes.cancelButton}
                            color={theme.colors.secondaryContrast}
                            onPress={()=> {this.props.handleNavigation(undefined)}}/>
                    </View>
                </View>
            </View>
        )
    }

    submit = () => {
        const { documentType, defaultStatus } = this.state;
        const { images } = this.props;

        documents.create(images, documentType, defaultStatus);

        this.props.handleNavigation(undefined);
    }
}

const Submit = withTheme(SubmitComponent);
export { Submit };

const pickerSelectStyle = theme => ({
    inputIOS: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 12,    
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: theme.colors.secondaryContrast,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#614051',
        borderRadius: 8,
        color: theme.colors.secondaryContrast,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});