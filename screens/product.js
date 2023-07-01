import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar, Animated, ScrollView } from 'react-native'
import { HeaderProduct, ProductDetails } from '../component/product-component'
import ImageSlider from '../component/imageSlider'
import { FlatList } from 'react-native-gesture-handler'


export const handleToProductPage = (product, navigation) => {

    navigation.navigate('Product', { product })
}


export default function ProductScreen({ navigation, route }) {

    const scrollY = React.useRef(new Animated.Value(0)).current

    const { product } = route.params

    return (
        <View style={styles.container}>
            <HeaderProduct scrollY={scrollY} />
            <ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={32}
            >

                <ProductDetails product={product} />

            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white'
    },
    status: {
        width: '100%',
        height: StatusBar.currentHeight,
        backgroundColor: 'white'

    },

})