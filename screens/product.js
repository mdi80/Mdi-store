import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar, Animated, ScrollView } from 'react-native'
import { HeaderProduct, ProductColor, ProductDesc, ProductDetails, ProductFeatures } from '../component/product-component'
import ImageSlider from '../component/imageSlider'
import { FlatList } from 'react-native-gesture-handler'
import { MostProductsView } from '../component/home-screen-comp'


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

                <ProductColor product={product} />

                <ProductDesc product={product} />
                <ProductFeatures product={product} />
                <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=5" title="Top Sale" />
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