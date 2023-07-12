import { StyleSheet, View, Dimensions, Image, StatusBar, Animated, Text, FlatList } from 'react-native'
import { Carousel } from 'react-native-basic-carousel'
import ImageSlider from './imageSlider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../theme';
import { useEffect, useRef, useState } from 'react';
import { useDataFetching } from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const HeaderProduct = (props) => {
    // const inputRange = [];
    const elevation = props.scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const [like, setLike] = useState(false)

    useEffect(() => {
        //TODO get like status
        setLike(false)
    }, [])

    const navigation = useNavigation()

    const handelLike = () => {
        //TODO send request to make this product fav
        setLike(!like)
    }
    const handelClose = () => {
        navigation.goBack()
    }


    return (
        <Animated.View style={{
            borderBottomColor: 'gray',
            elevation: elevation,
        }}>
            <View style={stylesHeaderProduct.status} />
            <View style={stylesHeaderProduct.HeaderProduct}>
                <TouchableOpacity activeOpacity={0.9} onPress={handelClose}>
                    <MaterialIcon name="close" size={30} color="#444" />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} onPress={handelLike}>
                    {like ?
                        <MaterialIcon name="favorite" size={25} color="#B71C1C" />

                        :
                        <MaterialIcon name="favorite-border" size={25} color="#444" />
                    }
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
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingRight: 1, width: '100%' }}>
                    <Text style={{ flex: 15, fontSize: theme.typography.fontSize.header + 5, fontFamily: theme.typography.fontFamily, fontWeight: 'bold' }}>
                        {product.title}
                    </Text>
                    {product.isNew &&
                        <MaterialIcon style={{ flex: 1, marginTop: 5, }} color={theme.colors.primary} name="fiber-new" size={20} />
                    }
                </View>

                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                    <MaterialIcon style={{ color: theme.colors.primary, marginRight: 5 }} name="mode-comment" size={20} />
                    <Text style={{ color: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                        {product.comments} comment Over this product
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
    const minLine = 3
    const [lines, setLines] = useState(0)
    const handleTextLayout = (e) => {
        const { lines } = e.nativeEvent;
        setLines(lines.length)
    }
    const [numLines, setNumLines] = useState(minLine)

    return (
        <View style={{ padding: 20, marginTop: 20, }}>
            <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header, fontWeight: 'bold' }}>Description</Text>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ textAlign: 'left', width: '100%', color: '#757575', fontFamily: theme.typography.fontFamily }} numberOfLines={numLines} onTextLayout={handleTextLayout}>{product.description}</Text>
                {lines >= minLine &&
                    <TouchableOpacity onPress={() => setNumLines((numLines === lines ? minLine : lines))} style={{ marginTop: 10, }} activeOpacity={1}><Text style={{ color: theme.colors.primary }}>{numLines == lines ? 'See less' : 'See More'}</Text></TouchableOpacity>
                }
            </View>
        </View>
    )
}



export function ProductFeatures({ product }) {
    let data = {}
    try {
        data = JSON.parse(product.feature)
    } catch { }

    console.log(data);
    if (Object.keys(data).length == 0) return (<View></View>)

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



export function CommentsProduct(props) {

    const itemWidth = 3 * screenWidth / 4
    const [data, setData] = useState([])
    const maxSizeOfComments = 5
    const [showMore, setShowMore] = useState(false)



    useEffect(() => {
        if (props.comments.length > maxSizeOfComments) {
            setShowMore(true)
            setData([...props.comments.slice(0, maxSizeOfComments), { id: -1, showMore: true }])
            console.log('here');

        } else {
            setShowMore(false)
            setData(props.comments)
        }
    }, [])

    const renderItem = ({ item, index }) => {
        console.log(item);
        if (item.showMore)
            return (
                <View style={{ height: "100%", width: screenWidth / 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="arrow-alt-circle-right" size={50} color={theme.colors.primary} />
                </View>
            );

        return (
            <CommentComp item={item} />
        )
    }

    return (
        <>
            {/* <View style={{}}>
                {
                    props.comments.map((item, index) => (
                        <CommentComp item={item} />

                    ))
                }
            </View> */}
            <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header, fontWeight: 'bold', padding: 20 }}>Comments</Text>
            <FlatList
                horizontal
                style={{ backgroundColor: '#eee' }}
                contentContainerStyle={{ padding: 10 }}
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}

            />
        </>
    )
}


export const CommentComp = (props) => {

    const likeStatusType = { like: 1, dislike: 0, noAction: -1 }

    const [likeStatus, setLikeStatus] = useState(props.item.likeStatus)


    const onLikeDislikePressed = (isLike) => {
        //TODO send like or dislike comment for current user to api

        if (isLike) {
            if (likeStatus === likeStatusType.like) setLikeStatus(likeStatusType.noAction)
            else setLikeStatus(likeStatusType.like)
        } else {
            if (likeStatus === likeStatusType.dislike) setLikeStatus(likeStatusType.noAction)
            else setLikeStatus(likeStatusType.dislike)

        }
    }

    return (

        <TouchableOpacity activeOpacity={1}>
            <View style={{ padding: 10, width: 3 * screenWidth / 4, backgroundColor: 'white', shadowOffset: 2, elevation: 6, marginLeft: 10, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 20, paddingBottom: 10, }}>
                    <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header }}>{props.item.username}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ color: '#757575', fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.small, marginRight: 10 }}>{props.item.created}</Text>
                        {props.item.isLiked ?
                            <AntDesign name="like1" color="#2E7D32" size={21} />
                            :
                            <AntDesign name="dislike1" color="#C62828" size={21} />
                        }

                    </View>

                </View>

                <View style={{ marginLeft: 40, marginRight: 20, paddingBottom: 10, height: 100 }}>
                    <Text style={{ color: "#757575", fontFamily: theme.typography.fontFamily }} numberOfLines={5}>
                        {props.item.comment}

                    </Text>
                </View>
                <View style={{ marginTop: 5, paddingLeft: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignContent: "flex-end", }}>
                    <Text style={{ color: "#444", fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button }}>This comment is helpful?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 10 }} activeOpacity={0.8} onPress={() => onLikeDislikePressed(true)}>
                            {likeStatus == likeStatusType.like ?
                                <AntDesign name="like2" color="#2E7D32" size={20} />
                                :
                                <AntDesign name="like2" color="#757575" size={20} />
                            }

                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.8} onPress={() => onLikeDislikePressed(false)}>
                            {likeStatus == likeStatusType.dislike ?
                                <AntDesign name="dislike2" color="#C62828" size={20} />
                                :
                                <AntDesign name="dislike2" color="#757575" size={20} />
                            }
                        </TouchableOpacity>

                    </View>

                </View>
            </View >
        </TouchableOpacity>
    )
}




export function AddToStoreBtn(props) {


    return (
        <View style={{ width: screenWidth, height: 60, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 10, borderTopWidth: 1, paddingLeft: 30, paddingRight: 30, borderTopColor: '#ececec', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

            <TouchableOpacity style={{ width: screenWidth / 3, height: 45, backgroundColor: theme.colors.primary, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: 'white' }}>Add To Cart</Text>
            </TouchableOpacity>
            <View style={{ height: 45, alignItems: 'center' }}>
                {props.product.discount != 0 &&
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: theme.typography.fontSize.small - 1, fontFamily: theme.typography.fontFamily, fontWeight: 'bold' }}
                            ellipsizeMode="tail">{parseFloat(props.product.price)} $</Text>
                        <Text style={{ fontSize: theme.typography.fontSize.small - 1, fontFamily: theme.typography.fontFamily, backgroundColor: theme.colors.primary, color: 'white', padding: 1, paddingLeft: 3, paddingRight: 3, borderRadius: 5, marginLeft: 4 }}>
                            {(parseInt(100 * (props.product.discount / props.product.price)) == 0 ? 1 : parseInt(100 * (props.product.discount / props.product.price)))}%

                        </Text>
                    </View>
                }
                <Text
                    style={{ fontSize: theme.typography.fontSize.button + 2, fontFamily: theme.typography.fontFamily, fontWeight: 'bold', flex: 2 }}
                    ellipsizeMode="tail">
                    {parseFloat(props.product.price - props.product.discount) + " $"}
                </Text>
            </View>
        </View>
    )
}