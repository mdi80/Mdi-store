import { StyleSheet, View, Dimensions, Image } from 'react-native'
import { Carousel } from 'react-native-basic-carousel'
import ImageSlider from './imageSlider';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export const ProductImages = ({ product }) => {


    return (
        <View style={styles.container}>

            <ImageSlider data={product.image.map((item, index) => { return { id: index, image: item.image } })} height={300} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        backgroundColor: 'white'
    }
})