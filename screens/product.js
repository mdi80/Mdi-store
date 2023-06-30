import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { ImageSliderProduct } from '../component/product-component'


export const handleToProductPage = (product, navigation) => {

    navigation.navigate('Product', { product })
}


export default function ProductScreen({ navigation, route }) {

    const { product } = route.params

    return (
        <View style={styles.container}>
            <View style={styles.status} />
            <ImageSliderProduct imagesUrl={product.image} />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#BDBDBD'
    },
    status: {
        width: '100%',
        elevation: 1,
        height: StatusBar.currentHeight,
        backgroundColor: 'white'


    },

})