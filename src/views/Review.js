import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, Platform, ActionSheetIOS, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Icon, TitleBar, BottomSheet, Thumbnail } from '../components';
import { withTheme } from "@callstack/react-theme-provider";
import { connect } from 'react-redux';
import { documentActions } from '../lib/redux/actions';

const DEFAULT_SORT = 'dateOfCapture';

const SORT_BY_OPTIONS = [
    {
        label: 'Date',
        value: 'date',
        property: 'dateOfCapture'
    },
    {
        label: 'Type',
        value: 'type',
        property: 'type'
    },
    {
        label: 'Status',
        value: 'status',
        property: 'status'
    },

]
const style = theme => ({
    container: {
    },
    list: {
        backgroundColor: theme.colors.background,
        zIndex: 1
    },
    documentContainer: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#cccccc',
        paddingBottom: 10
    },
    imageContainer: {
        margin: 5,
        width: '40%',
        position: 'relative'
    },
    metaContainer: {
        flexDirection: 'column',
        position: 'relative',
        flex: 1
    },
    topLineContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    submitDate: {
        color: theme.colors.secondaryContrast,
        flex: 1
    },
    status: {
        fontWeight: 'bold',
    },
    typeContainer: {
        flexDirection: 'row'
    },
    type: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.secondaryContrast,
        flex: 1
    },
    pending: {
        color: '#FD9927',
    },
    accepted: {
        color: '#6ACA6B'
    },
    unreadable: {
        color: '#FC0D1B'
    },
    received: {
        color: '#6ACA6B'
    },
    expiring: {
		color: '#FC0D1B'
	},
	expired: {
		color: '#FC0D1B'
	},
    statusView: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        color: theme.colors.secondaryContrast
    },
    icon: {
        padding: 5,
        color: 'blue'
    },
    checkmark: {
        color: 'green',
        position: 'absolute',
        zIndex: 9999
    }
});

const SortByButton = ({onChange, value, sortByOptions}) => ( 
    <>
        <RNPickerSelect 
            placeholder={{ label: 'Sort By', color: '#157EFB', value: null }}
            items={sortByOptions.map(({label, value}, key) => ({ label, value, key, color: 'black' }))} 
            onValueChange={sortBy => onChange( sortBy )}
            style={{...pickerSelectStyles, iconContainer: {
                top: 8,
                right: 5,
            }}}
            useNativeAndroidPickerStyle={true}
            value={value}
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
    </>
);

// @connect((store) => ({
//     documents: store.documents.list, 
//     statuses: store.status.list
// }), 
// dispatch => ({
//     loadDocuments: () => (dispatch(documentActions.getDocuments())),
//     deleteDocuments: ids=> (dispatch(documentActions.deleteDocuments(ids)))
// }))
class ReviewComponent extends React.Component {
    state = { 
        sortBy: 'date', 
        selectedDocuments: [], 
        selectionMode: false, 
        imageContainerViewWidth: 0, 
        imageContainerViewHeight: 0, 
        sortByOptions: SORT_BY_OPTIONS
    };
    
    componentDidMount() {
        this.props.loadDocuments();
    }

    render() {
        const { sortBy, sortByOptions } = this.state;
        const { documents, theme } = this.props;
        const  classes = style(theme);
        let sorted = [].slice.call(documents).sort((a, b) => {
            let selectedOption = sortByOptions.find(o => o.value === (sortBy || DEFAULT_SORT));
            if (!selectedOption) {
                return 0;
            }

            if(typeof a[selectedOption.property] === 'string')
                return a[selectedOption.property] > b[selectedOption.property] ? -1 : 1;
            
            if (a[selectedOption.property].name)
                return a[selectedOption.property].name > b[selectedOption.property].name ? 1 : -1;
        });

        return(
            <>
                <TitleBar title={'Review Docs'}
                    button={ <SortByButton onChange={value => this.setState({sortBy: value})} sortByOptions={sortByOptions}/> } />
                <View style={{...this.props.style, ...classes.container}}>
                    <FlatList
                        data={sorted}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderDocument}
                        style={classes.list}/>
                </View>
                { this.state.selectionMode ? (Platform.OS == 'ios' ? this.renderAndroidActionSheet() : this.renderAndroidActionSheet()) : null }
            </>
        )
    }

    keyExtractor = (document, index) => (document.id || index.toString());

    renderDocument = ({item, index, separators})  => {
        const { theme } = this.props;
        const  classes = style(theme);
        return (<TouchableOpacity
            onPress={() => { this.state.selectionMode && this.toggleDocumentSelection(item.id) }} style={classes.documentContainer}>
                <View style={classes.imageContainer}>
                    { this.state.selectedDocuments.some(d => d === item.id) ? <Icon name='checkmark-circle-outline' style={classes.checkmark} size={30}/> : null}
                    <Thumbnail images={item.images}/>
                </View>
                <View style={classes.metaContainer}>
                    <View style={classes.topLineContainer}>
                        <Text style={classes.submitDate}>submitted: { new Date(item.dateOfCapture).toLocaleDateString('en-us') }</Text>
                        {!item.status ? <></> : this.renderStatus({...item.status})}
                    </View>
                    <View style={classes.typeContainer}>
                        <Text style={classes.type}>{!item.type ? '' : item.type.name}</Text>
                    </View>
                </View>
        </TouchableOpacity>)
    }

    selectionMode = (selectionMode) => {
        let { selectedDocuments } = this.state;

        if (!selectionMode) {
            selectedDocuments = [];
        }

        this.setState({ selectionMode, selectedDocuments });
    }

    toggleDocumentSelection = (id) => {
        let { selectedDocuments = [] } = this.state;

        if (selectedDocuments.indexOf(d => d === id) != -1)
        {
            selectedDocuments = selectedDocuments.filter(d => d != id);
        } else {
            selectedDocuments.push(id);
        }

        this.setState({ selectedDocuments })
    }

    renderIOSActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Delete Selected Documents', 'Cancel'],
                cancelButtonIndex: 1
            },
            this.handleAction
        )
    }

    renderAndroidActionSheet = () => ( 
        <BottomSheet
            options={['Delete Selected Documents', 'Re-Submit Selected Document', 'Cancel']} 
            onSelected={this.handleAction} shown={this.state.selectionMode}
            onHide={() => this.selectionMode(false) } holdOpen={true}/>
    )

    handleAction = (idx) => {
        let { documents, deleteDocuments, loadDocuments } = this.props;

        switch(idx) {
            case 0:
                deleteDocuments(this.state.selectedDocuments);
                loadDocuments();
                this.selectionMode(false);
                break;
            case 1: 
                documents
                    .filter(doc => (this.state.selectedDocuments.includes(doc.id)))
                    .map(doc => documents.create(doc.images, doc.docType));
                this.selectionMode(false);
                break;
            case 2:
                this.selectionMode(false);
                break;
        }
    }

    renderStatus = (status) => {
        console.log(status);
        const { theme } = this.props;
        const  classes = style(theme);
        return (<TouchableOpacity onPress={() => { status.message && this.alert(status.message)}}>
            <View style={classes.statusView}>
                <Text style={classes[status.code.toLowerCase()]}>{status.name}</Text>
                { status.iconName ? <Icon name={status.iconName} style={ {...classes.icon, ...classes[`${status.code.toLowerCase()}Icon`] } } size={20} /> : null } 
            </View>    
        </TouchableOpacity>)
    }

    alert = (message) => {
        Alert.alert(message);
    }
}

const Review = withTheme(ReviewComponent);
export { Review };

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 30,
        width: 100,
        fontSize: 16, 
        color: '#157EFB',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 30,
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: '#157EFB',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});