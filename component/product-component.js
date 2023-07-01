import { StyleSheet, View, Dimensions, Image, StatusBar, Animated, Text } from 'react-native'
import { Carousel } from 'react-native-basic-carousel'
import ImageSlider from './imageSlider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const HeaderProduct = (props) => {
    // const inputRange = [];
    const elevation = props.scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 2],
        extrapolate: 'clamp'
    })

    return (
        <Animated.View style={{
            elevation: elevation,
        }}>
            <View style={stylesHeaderProduct.status} />
            <View style={stylesHeaderProduct.HeaderProduct}>
                <TouchableOpacity>
                    <MaterialIcon name="close" size={30} color="#444" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialIcon name="favorite-border" size={25} color="#444" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const stylesHeaderProduct = StyleSheet.create({
    status: {
        width: '100%',
        height: StatusBar.currentHeight,
        backgroundColor: 'white'

    },
    HeaderProduct: {
        width: screenWidth,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: theme.spacing.medium,
        paddingLeft: theme.spacing.medium
    }

})



export const ProductDetails = ({ product }) => {


    return (
        <View style={stylesProductDetails.container}>

            <ImageSlider data={product.image.map((item, index) => { return { id: index, image: item.image } })} height={300} />

            <View style={stylesProductDetails.details}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20 }}>
                    <Text style={{ fontSize: theme.typography.fontSize.small, fontFamily: theme.typography.fontFamily, color: theme.colors.primary, fontWeight: 700 }}>{product.category_name}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: theme.typography.fontSize.small, fontFamily: theme.typography.fontFamily, color: theme.colors.primary, paddingRight: 3 }}>{product.rating.toFixed(1)}</Text>
                        <MaterialIcon name="star" size={15} color="gold" />
                    </View>

                </View>

                <Text style={{ fontSize: theme.typography.fontSize.header, fontFamily: theme.typography.fontFamily, fontWeight: 'bold' }}>{product.title} {product.title}</Text>

            </View>

        </View>
    )
}

const stylesProductDetails = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white'
    },
    details: {
        paddingLeft: 20,
        paddingRight: 20,
    }
})