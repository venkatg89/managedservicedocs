import React from 'react';
import { Animated, Easing, View, Dimensions, StyleSheet } from 'react-native'

export class Toast extends React.Component {
    offsetValue = new Animated.Value(this.props.start || Dimensions.get('window').height);
    state = {
        animationComplete: false
    }

    componentDidMount() {
        setTimeout(this.startAnimation, this.props.delay)
    }

    componentDidUpdate(prev) {
        if (prev.animate != this.props.animate)
            setTimeout(this.startAnimation, this.props.delay)
    }

    startAnimation = () => {
        if (!this.props.animate) {
            return;
        }
        
        this.self.measure((x, y, width, height, pageX, pageY) => {
            const { start, end } = this.getStartAndEnd(x, y, width, height)
             
            this.offsetValue.setValue(start);

            Animated.timing(
                this.offsetValue,
                {
                    toValue: end,
                    duration: this.props.duration || 500,
                    easing: this.props.easing || Easing.linear
                }
            ).start(() => {
                this.setState({ animationComplete: true }); 
                this.props.onAnimationComplete && this.props.onAnimationComplete();
            })
        });
    }

    getStartAndEnd = (x, y, width, height) => {
        let values = {};
        if (this.props.animate === 'in') {
            values.start = this.props.start || height;
            values.end = this.props.end || 0;
        }
        else {
            values.start = this.props.end || 0;
            values.end = this.props.start || height;
        }

        return values;
    }
    

    render() {
        return(
            <Animated.View style={{
                ...this.props.style,
                transform:[{translateY: this.offsetValue}]
                }}>
                <View ref={ref => this.self = ref} style={{...styles.defaultContainer, ...this.props.style}}>
                    { this.props.children }
                </View>
            </Animated.View>
        )
    }
}

const styles =  StyleSheet.create({
    defaultContainer : {
        width: '100%',
        backgroundColor: 'white',
        bottom: 0
    }
});