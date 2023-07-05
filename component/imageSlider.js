import React from 'react';
import { Animated, Image, Dimensions, View } from 'react-native'

const screenWidth = Dimensions.get('window').width;

const Indicator = ({ data, scrollX }) => {
    const inputRangePos = [];
    const outputRangePos = [];
    for (let j = 0; j < data.length; j++) {
        inputRangePos.push(j * screenWidth);
    }
    outputRangePos.push(0);
    let sum = 0;
    const t = data.length * 10 + 5
    for (let j = 0; j < data.length - 3; j++) {
        outputRangePos.push(sum);
        sum += parseInt(t / (data.length - 3))
    }
    outputRangePos.push(t);
    outputRangePos.push(t);

    const position = scrollX.interpolate({
        inputRange: inputRangePos,
        outputRange: outputRangePos,
        extrapolate: 'clamp'
    })

    return (
        <View style={{ position: 'absolute', bottom: 20, left: 50, width: 70, overflow: 'hidden' }}>

            <Animated.View style={{ flexDirection: 'row', right: position }}>


                {data.map((_, i) => {
                    const inputRange = [(i - 2) * screenWidth, (i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth, (i + 2) * screenWidth]
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 0.8, 1.2, 0.8, 0.6],
                        extrapolate: 'clamp'
                    })
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.6, 0.8, 1, 0.8, 0.6],
                        extrapolate: 'clamp'
                    })
                    return (
                        <Animated.View
                            key={`Indicator-${i}`}
                            style={{ height: 8, width: 8, margin: 5, borderRadius: 5, backgroundColor: '#333', opacity, transform: [{ scale }] }}
                        />
                    )
                }
                )}
            </Animated.View>
        </View>
    )
}

export default function ImageSlider(props) {

    const scrollX = React.useRef(new Animated.Value(0)).current


    const renderItem = (data) => {
        return (
            <View style={{ width: screenWidth }}>
                <View style={{}}>
                    <Image source={{ uri: data.item.image }} style={{ width: screenWidth - 20, height: props.height, borderRadius: 10, resizeMode: 'contain' }} />

                </View>
            </View>
        )
    }

    return (

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Animated.FlatList
                horizontal
                contentContainerStyle={{ padding: 10 }}
                showsHorizontalScrollIndicator={false}
                data={props.data}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                pagingEnabled
            />

            <Indicator data={props.data} scrollX={scrollX} />

        </View>
    )
}