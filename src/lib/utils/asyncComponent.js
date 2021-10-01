import React from 'react';

export const asyncComponent = (component) => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            component()
                .then(cmp => {
                    this.setState({Component: cmp.default.default});
                });
        }

        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props}/> : null;
        }
    }
};