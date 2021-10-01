import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import propTypes from 'prop-types';

class RNCarousel extends React.Component {
    state = { activeSlide: 0 }

    get Pagination() {
        const { activeSlide } = this.state;
        const { data } = this.props;
        return (
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              dotStyle={styles.dotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    renderItem = ({item}) => {
        return (
            <Image source={{uri: 'data:image/png;base64,' + item}} style={styles.image} />
        );
    }

    render() {
        const { data, width } = this.props;
        return (
            <>
                <Carousel
                    data={data}
                    renderItem={this.renderItem}
                    itemWidth={width}
                    sliderWidth={width}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                { this.Pagination }
            </>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.92)'
    }
});

RNCarousel.propTypes = {
    width: propTypes.number
}

RNCarousel.defaultProps = {
    width: 10
}

export { RNCarousel };