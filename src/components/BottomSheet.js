import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
// import { withTheme } from "@callstack/react-theme-provider";

const style = theme => ({
    backgroundContainer: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    background: {
        flex: 1
    },
    sheetContainer: {
        width: '100%',
        //backgroundColor: theme.colors.contrast,
    },
    option: {
        width:'100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        //borderBottomColor: theme.colors.secondaryContrast,
        borderBottomWidth: 1,
    }
});

class BottomSheetComponent extends React.Component {
    state = { sheet: undefined };

    componentDidUpdate(prev) {
        if (prev.shown != this.props.shown)
            this.setState({ sheet: 'in' });
    }

    render() {
        const { options, onSelected, shown, onHide, theme } = this.props;
        const { sheet } = this.state;
        const  classes = style(theme);

        return (
            shown ? 
            <View style={ classes.backgroundContainer } pointerEvents='box-none'>
                { this.props.holdOpen ? null : <TouchableOpacity style={classes.background} onPress={() => { this.setState({sheet: 'out'})}}/> }
                <View style={classes.sheetContainer}>
                {
                    options.map((opt, idx) => (
                            <TouchableOpacity key={idx} style={classes.option} onPress={() => { onSelected(idx); }}>
                                <Text>{opt}</Text>
                            </TouchableOpacity>
                    ))
                }
                </View>
            </View>
            : null
        );
    }
}

// const BottomSheet = withTheme(BottomSheetComponent);
// export { BottomSheet };

export { BottomSheetComponent };