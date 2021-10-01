import React from 'react';

export class Draggable extends React.Component {
    state = { pan: new Animated.ValueXY() }

    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);

        // Initialize PanResponder with move handling
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ])
        });

        // adjusting delta value
        this.state.pan.setValue({ x:0, y:0})
    }

    render() {
        const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }
        return (
            <Animated.View
              {...this.panResponder.panHandlers}>
                { this.props.children }  
            </Animated.View>
        );
      }
}