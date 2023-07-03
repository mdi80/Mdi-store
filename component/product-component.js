import { StyleSheet, View, Dimensions, Image, StatusBar, Animated, Text, FlatList } from 'react-native'
import { Carousel } from 'react-native-basic-carousel'
import ImageSlider from './imageSlider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import theme from '../theme';
import { useState } from 'react';
import { useDataFetching } from '../utils';

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
                    {product.rating != null &&
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: theme.typography.fontSize.small, fontFamily: theme.typography.fontFamily, color: theme.colors.primary, paddingRight: 3 }}>{product.rating.toFixed(1)}</Text>
                            <MaterialIcon name="star" size={15} color="gold" />
                        </View>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: theme.typography.fontSize.header + 5, fontFamily: theme.typography.fontFamily, fontWeight: 'bold' }}>{product.title} {product.title}
                    </Text>
                    <MaterialIcon color={theme.colors.primary} style={{ marginLeft: 5 }} name="fiber-new" size={20} />

                </View>

                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                    <MaterialIcon style={{ color: theme.colors.primary, marginRight: 5 }} name="mode-comment" size={20} />
                    <Text style={{ color: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                        1000 comment Over this product
                    </Text>

                </View>

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



export const ProductColor = (props) => {

    const data = props.product.color_names
    const color_values = props.product.color_values
    const [selected, setSelected] = useState(0)


    return (
        <View style={{ marginTop: 40 }}>
            <Text style={{ marginLeft: 20, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: 'gray' }}>{data[selected]}</Text>
            <FlatList
                style={{ width: screenWidth, marginTop: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}

                contentContainerStyle={{ paddingLeft: 20 }}
                renderItem={({ item, index }) => (
                    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color_values[index], marginRight: 20, borderWidth: (selected == index ? 2 : 0), borderColor: '#757575' }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setSelected(index)} style={{ width: "100%", height: "100%" }} />
                    </View>
                )}

            />
        </View>
    )
}




export function ProductDesc({ product }) {
    const maxLine = 10
    const minLine = 3

    const [numLines, setNumLines] = useState(3)

    return (
        <View style={{ padding: 20, marginTop: 20, }}>
            <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header, fontWeight: 'bold' }}>Description</Text>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#757575', fontFamily: theme.typography.fontFamily }} numberOfLines={numLines}>{product.description}{product.description + " heel "}{product.description}{product.description}{product.description}{product.description}</Text>
                <TouchableOpacity onPress={() => setNumLines((numLines === maxLine ? minLine : maxLine))} style={{ marginTop: 10, }} activeOpacity={1}><Text style={{ color: theme.colors.primary }}>{numLines == maxLine ? 'See less' : 'See More'}</Text></TouchableOpacity>
            </View>
        </View>
    )
}



export function ProductFeatures({ product }) {
    // const [data, setData] = useState({})
    // useDataFetching('',setData)

    const data = { size: 'Large', material: 'Panabah', lenght: '180' }
    return (
        <View style={{ padding: 20, marginTop: 20, }}>
            <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header, fontWeight: 'bold' }}>Product Features</Text>

            <View style={{}}>
                {
                    Object.keys(data).map((key, index) => {
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }} key={index}>
                                <View style={{ backgroundColor: '#757575', width: 7, height: 7, borderRadius: 3, marginRight: 2 }}></View>

                                <Text style={{ color: '#757575' }}>{key} : </Text>
                                <Text> {data[key]}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}   
