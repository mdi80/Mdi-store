import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar, Animated, ScrollView } from 'react-native'
import { AddToStoreBtn, CommentComp, CommentsProduct, HeaderProduct, ProductColor, ProductDesc, ProductDetails, ProductFeatures } from '../component/product-component'
import ImageSlider from '../component/imageSlider'
import { FlatList } from 'react-native-gesture-handler'
import { MostProductsView } from '../component/home-screen-comp'


export const handleToProductPage = (product, navigation) => {

    navigation.navigate('Product', { product })
}


export default function ProductScreen({ navigation, route }) {

    const scrollY = React.useRef(new Animated.Value(0)).current

    const { product } = route.params

    //TODO get comments from api
    const comments = [
        { id: 2, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every one.This product is very good for every one.This product is very good for every one." },
        { id: 3, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every two." },
        { id: 4, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every one." },
        { id: 5, user: 'Amin', date: '2022-12-04', like: false, body: "This product is very good for every one." },
        { id: 6, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every one." },
        { id: 7, user: 'Amin', date: '2022-12-04', like: false, body: "This product is very good for every one." },
        { id: 8, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every one." },
        { id: 9, user: 'Amin', date: '2022-12-04', like: true, body: "This product is very good for every one.This product is very good for every one." },
    ]
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
                <CommentsProduct comments={comments} />
                <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=5" title="Most sales of category" />
            </ScrollView>
            <AddToStoreBtn product={product} />
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