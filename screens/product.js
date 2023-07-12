import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar, Animated, ScrollView } from 'react-native'
import { AddToStoreBtn, CommentComp, CommentsProduct, HeaderProduct, ProductColor, ProductDesc, ProductDetails, ProductFeatures } from '../component/product-component'
import ImageSlider from '../component/imageSlider'
import { FlatList } from 'react-native-gesture-handler'
import { MostProductsView } from '../component/home-screen-comp'
import { BarIndicator } from 'react-native-indicators';
import { useDataFetching } from '../utils'





export default function ProductScreen({ navigation, route }) {

    const scrollY = React.useRef(new Animated.Value(0)).current

    const { productId } = route.params

    const [product, setProduct] = React.useState(null)
    const [comments, setComment] = React.useState(null)


    useDataFetching(`https://mdi80nz.pythonanywhere.com/api/get-product/${productId}/`, setProduct)

    useDataFetching(`https://mdi80nz.pythonanywhere.com/api/get-comments/?productId=${productId}`, setComment, (len) => { console.log(len) })

    if (!product || !comments)
        return (
            <View style={styles.container}>
                <BarIndicator />
            </View>
        )


    return (
        <View style={styles.container}>
            <HeaderProduct scrollY={scrollY} product={product} />
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
                <MostProductsView uri={`https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?categoryId=${product.productCategory}&sort-mostSale`} title="Most sales of category" />
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