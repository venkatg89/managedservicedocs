import React from 'react';
import { DatePickerAndroid, Platform, Text, View } from 'react-native';
// import { withTheme } from "@callstack/react-theme-provider";

const style =  theme => ({
    container: {
        width: '100%',
        height: 30,
        flexDirection: 'column',
       // backgroundColor: theme.colors.contrast,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
    }
});

class DatePickerComponent extends React.Component {
    state = { value: undefined };

    render() {
        return Platform.OS == 'ios' ? this.renderIOS() : this.renderAndroid();
    }

    renderAndroid() {
        const { currentValue } = this.state;
        const { theme } = this.props;
        const  classes = style(theme);
        return (
            <View style={{...classes.container, ...this.props.style}}>
                <Text style={{...classes.text}} onPress={async ()=>{ 
                    const { action, year, month, day } = await DatePickerAndroid.open({date: new Date()});

                    if(action != DatePickerAndroid.dismissedAction) {
                        if (this.props.onDateSelected)
                            this.props.onDateSelected(new Date(year, month, day));
                        
                        this.setState({ currentValue: `${month + 1}/${day}/${year}` });
                    }

                }}> {currentValue} </Text>
            </View>
        )
    }
}

// const DatePicker = withTheme(DatePickerComponent);
// export { DatePicker };

export { DatePickerComponent };