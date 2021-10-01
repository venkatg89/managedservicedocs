import React from 'react';
import DocumentsOptionsLogo from "../assets/documents_Options_ScreenOnePiece.svg";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Slide } from '../components';
import { connect } from 'react-redux';
import { navigationActions }  from '../lib/redux/actions';
import { Capture, Review, Help, Settings } from './';

// @connect(store => ({}),
// dispatch => ({
//     viewClicked: (view) => ( dispatch(navigationActions.viewClicked(view)))
// }))
export class Menu extends React.Component {
    render() {
        const { viewClicked } = this.props;
        return (
            <View style={styles.container}>
                <DocumentsOptionsLogo style={styles.background} />
                <View style={styles.menuContainer}>
                    <View style={styles.header}/>
                    <View style={styles.options}>
                        <Slide>
                            <TouchableOpacity onPress={() => { viewClicked('capture'); this.onSelect(Capture, 'Capture') }}>
                                <Text style={styles.menuItem}>Capture Documents</Text>
                            </TouchableOpacity>
                        </Slide>
                        <Slide delay={200}>
                            <TouchableOpacity onPress={() => { viewClicked('review'); this.onSelect(Review, 'Review Docs') }}>
                                <Text style={styles.menuItem}>Review Documents</Text>
                            </TouchableOpacity>
                        </Slide>
                        <Slide delay={400}>
                            <TouchableOpacity onPress={() => { viewClicked('help'); this.onSelect(Help, 'Help') }}>
                            <Text style={styles.menuItem}>Help</Text>
                        </TouchableOpacity>
                        </Slide>
                        <Slide delay={600}>
                            <TouchableOpacity onPress={() => { viewClicked('settings'); this.onSelect(Settings, 'Settings') }}>
                                <Text style={styles.menuItem}>Settings</Text>
                            </TouchableOpacity>
                        </Slide>
                    </View>
                </View>
            </View>
        )
    }

    onSelect = (view, title) => {
        this.props.onSelect && this.props.onSelect(view, title);
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#245f9b'
    },
    background: {
        position: 'absolute',
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    menuContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        flex: .25
    },  
    options: {
        flex: .63,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    menuItem: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});