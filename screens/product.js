import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { ProductImages } from '../component/product-component'
import ImageSlider from '../component/imageSlider'


export const handleToProductPage = (product, navigation) => {

    navigation.navigate('Product', { product })
}


export default function ProductScreen({ navigation, route }) {

    const { product } = route.params

    return (
        <View style={styles.container}>
            <View style={styles.status} />
            <ProductImages product={product}/>

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