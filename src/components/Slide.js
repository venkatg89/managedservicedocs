import React from 'react';
import { Animated, Easing, View, Dimensions } from 'react-native'

export class Slide extends React.Component {
    offsetValue = new Animated.Value(this.props.start || Dimensions.get('window').width);

    componentDidMount() {
        setTimeout(this.startAnimation, 0);
    }

    componentDidUpdate() {
        if (this.props.animateOnUpdate && this.props.animateOnUpdate()) {
            this.startAnimation();
        }
    }

    startAnimation = () => {
        this.offsetValue.setValue(this.props.start || Dimensions.get('window').width);

        Animated.timing(
            this.offsetValue,
            {
                toValue: this.props.end || 0,
                duration: this.props.duration || 500,
                easing: this.props.easing || Easing.linear,
                delay: this.props.delay,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.onAnimationComplete && this.props.onAnimationComplete();
        });
    }

    render() {
        return(
            <Animated.View style={{
                ...this.props.style,
                transform:[{translateX: this.offsetValue}],
                }}>
                <View ref={ref => this.self = ref} style={this.props.style}>
                    { this.props.children }
                </View>
            </Animated.View>

        )
    }
}
