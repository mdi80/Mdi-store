import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../reducers/appReducer";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    set,
    StretchInX,
} from 'react-native-reanimated';
import theme from "../theme";
import { handleLoad, handleLoadStart, useDataFetching, useLoadingAnim } from "../utils";

const screenWidth = Dimensions.get('window').width;

const screenHeight = Dimensions.get('window').height;



const SearchOpen = (props) => {
    const inputtext = useRef(null);

    const handleBackPress = () => {
        props.setSearchFouc(false)
        return true

    }

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const clickOutside = () => {

        inputtext.current.blur()
    }
    return (
        <>
            <TouchableWithoutFeedback onPress={clickOutside}>
                <View style={{ ...stylesSearchbar.searchBarRoot, flex: 1 }}>

                    <View style={{ ...stylesSearchbar.searchBarRoot.textinputview }} >
                        <TouchableOpacity onPress={handleBackPress} style={{ padding: 5 }}>
                            <MaterialIcon name="arrow-back" size={25} color="#000" />
                        </TouchableOpacity>
                        <TextInput autoFocus={true} ref={inputtext} placeholder="Search" keyboardType="ascii-capable" style={stylesSearchbar.searchBarRoot.inputText} focusable={true} />

                    </View>
                </View>
            </TouchableWithoutFeedback>

        </>
    )
}

export const SearchBarHome = (props) => {

    const [searchFouc, setSearchFouc] = useState(false)

    const searchClicked = () => {
        setSearchFouc(true)
    }



    return (

        <>
            {!searchFouc ? (
                <View style={stylesSearchbar.searchBarRoot}>

                    <TouchableOpacity style={stylesSearchbar.searchBarRoot.searcharTouch} activeOpacity={0.7} onPress={searchClicked}>
                        <Icon name="search" size={20} style={stylesSearchbar.searchBarRoot.iconSearch} />
                        <Text style={stylesSearchbar.searchBarRoot.text}>
                            Search in <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>MDI STORE</Text>
                        </Text>

                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ height: '100%' }}>
                    <SearchOpen setSearchFouc={setSearchFouc} />

                </View>

            )
            }
        </>
    )
}

const stylesSearchbar = StyleSheet.create({
    searchBarRoot: {
        height: 100,
        borderBottomColor: 'gray',
        elevation: 1,
        backgroundColor: 'white',

        text: {
            color: '#777',
            fontSize: theme.typography.fontSize.header,
            margin: 10,
            fontFamily: theme.typography.fontFamily,
            marginLeft: 0,
        },
        searcharTouch: {
            margin: 10,
            marginTop: 40,
            height: 50,
            alignItems: 'center',
            borderRadius: theme.raduis.medium,
            backgroundColor: '#f2f2f2',
            flexDirection: 'row',
        },
        iconSearch: {
            padding: 13,
            color: "#888",
        },
        textinputview: {
            margin: 15,
            marginTop: 45,
            padding: 5,
            height: 50,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#00aaff'
        },
        inputText: {
            padding: 5,
            flex: 1,
            fontSize: theme.typography.fontSize.button,
            marginLeft: 10,
            height: 35,
        }
    }
})




////Start of first component
export const HomeScreenCategoriaclList = (props) => {
    // const [loadingImage, setLoadingImage] = useState([])
    const [data, setData] = useState([])
    useDataFetching(props.urlItems, setData)
    const [setLoadingItems, animatedStyle] = useLoadingAnim();

    return (
        <>
            <Animated.View style={[{ ...stylesCategoriaclList.container, backgroundColor: props.backColor }, animatedStyle]}>

                <ScrollView horizontal={true} style={{ height: '100%' }} showsHorizontalScrollIndicator={false}>
                    <View style={stylesCategoriaclList.titleItem}>
                        {props.hadleTitleView}
                        <Image source={{ uri: props.imageuri }} style={stylesCategoriaclList.titleItem.imageTitle} />
                        <TouchableOpacity style={stylesCategoriaclList.titleItem.btn}>
                            <Text style={{ color: 'white' }}>See All</Text>
                            <MaterialIcon name="arrow-right" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        data.map((item, index) =>
                            <CategoricalItem
                                key={index}
                                item={{ ...item, recDays: 1 }}
                                index={index}
                                setLoadingImage={setLoadingItems} />
                        )
                    }
                    {data.length >= 6 &&
                        <View style={stylesCategoriaclList.itemView}>
                            <View style={stylesCategoriaclList.itemViewSeeMore}>

                                <Icon name="arrow-alt-circle-right" size={50} color={theme.colors.primary} />
                                <Text style={stylesCategoriaclList.itemViewSeeMore.btn}>See All</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </Animated.View >

        </>
    )
}


const CategoricalItem = ({ item, setLoadingImage, index }) => {
    return (
        <TouchableOpacity style={stylesCategoriaclList.itemView} activeOpacity={1}>
            <View>
                <Image
                    source={{ uri: item.image[0].image }}
                    style={stylesCategoriaclList.imageItem}
                    onLoadStart={() => handleLoadStart(index, setLoadingImage)}
                    onLoad={() => handleLoad(index, setLoadingImage)} />

                <Text
                    style={stylesCategoriaclList.titleTextItem}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item.title}
                </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Icon name="rocket" size={15} color={theme.colors.primary} />
                {item.recDays == 1 ?
                    <Text style={{ color: 'gray', marginLeft: 10 }}>
                        Send tomorrow
                    </Text>

                    :
                    <Text style={{ color: 'gray', marginLeft: 10 }}>
                        Send in {item.recDays} days
                    </Text>
                }
            </View>

            <View>

                <ShowPrice price={item.price} discount={item.discount} />
            </View>
        </TouchableOpacity>
    )
}


const ShowPrice = ({ price, discount }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 40 }}>

        <View>
            <Text
                style={stylesCategoriaclList.textPriceItem}
                ellipsizeMode="tail">
                {parseFloat(price - discount) + " $"}
            </Text>
            {discount != 0 &&
                <Text
                    style={stylesCategoriaclList.textPrimaryPriceItem}
                    ellipsizeMode="tail">{parseFloat(price)} $</Text>
            }
        </View>
        <View>
            {discount != 0 &&
                <Text
                    style={stylesCategoriaclList.textDiscountPricePerItem}>
                    {(parseInt(100 * (discount / price)) == 0 ? 1 : parseInt(100 * (discount / price)))}%
                </Text>
            }
        </View>
    </View>
)

const stylesCategoriaclList = StyleSheet.create({
    //Styles for own list
    container: {
        width: screenWidth,
        height: 370,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: theme.spacing.large,
        paddingBottom: theme.spacing.large,
    },
    titleItem: {
        justifyContent: 'space-between',
        height: '100%',
        alignItems: 'center',
        paddingRight: theme.spacing.small,
        paddingLeft: theme.spacing.small,
        imageTitle: {
            width: 150,
            height: 150,
            borderRadius: theme.raduis.medium,
        },
        btn: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    itemViewSeeMore: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        flex: 1,
        btn: {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize.button,
            padding: theme.spacing.small,
            fontWeight: 'bold',
        }
    },

    //styles for List items
    itemView: {
        height: '100%',
        width: 175,
        backgroundColor: 'white',
        marginRight: theme.spacing.small,
        borderRadius: theme.raduis.medium,
        padding: theme.spacing.medium,
        justifyContent: 'space-between'
    },
    imageItem: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    titleTextItem: {
        maxWidth: '100%',
        fontSize: theme.typography.fontSize.button,
        fontFamily: theme.typography.fontFamily,
        margin: theme.spacing.medium,
    },
    textPriceItem: {
        maxWidth: '100%',
        fontSize: theme.typography.fontSize.button,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 'bold',
    },
    textPrimaryPriceItem: {
        maxWidth: '100%',
        color: 'gray',
        fontSize: theme.typography.fontSize.button,
        fontFamily: theme.typography.fontFamily,
        textDecorationLine: 'line-through',
    },
    textDiscountPricePerItem: {
        paddingLeft: theme.spacing.small,
        paddingRight: theme.spacing.small,
        padding: 3,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.raduis.medium,
    }
})

////// Start of second component
export const CategoryCom = (prop) => {
    const itemsPerLine = 3;
    const [data, setData] = useState([])
    useDataFetching(prop.urlItems, setData)
    const [setLoadingItems, animatedStyle] = useLoadingAnim();


    return (
        <Animated.View style={[stylesCategoryCom.container, animatedStyle]}>
            <Text style={{
                justifyContent: 'center', alignSelf: 'center', fontSize: 1.5 * theme.typography.fontSize.header, fontWeight: 600, fontFamily: theme.typography.fontFamily
            }}>Categories</Text>
            {[...Array(Math.ceil(data.length / itemsPerLine))].map((_, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {data.slice(rowIndex * itemsPerLine, (rowIndex + 1) * itemsPerLine).map((item, index) => (
                        <ImageButton key={item.id} src={{ uri: item.image }} title={item.title} index={index} setLoadingItems={setLoadingItems} />
                    ))}
                </View>
            ))}

        </Animated.View>
    )
}
export const ImageButton = (props) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={{ ...props.style, ...stylesCategoryCom.imageButton.container }} activeOpacity={0.7} >
            <Image
                onLoadStart={() => handleLoadStart(props.index, props.setLoadingItems)}
                onLoad={() => handleLoad(props.index, props.setLoadingItems)}
                source={props.src} style={stylesCategoryCom.imageButton.image}
                onError={() => dispatch(setError({ networkError: true }))} />
            <Text style={stylesCategoryCom.imageButton.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const stylesCategoryCom = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 315,
        justifyContent: 'space-between',
        padding: theme.spacing.medium,
    },
    imageButton: {
        container: {
            width: 130,
            height: 130,
            alignItems: 'center',
            justifyContent: 'center',
        },
        image: {
            width: 80,
            height: 80
        },
        text: {
            fontSize: theme.typography.fontSize.small,
            padding: theme.spacing.small + 3,
            fontFamily: theme.typography.fontFamily,
            maxWidth: 100,
            textAlign: 'center',
        }
    }
})

export const RecentProductView = (props) => {
    const itemsPerLine = 3;
    const maxHeight = 3;
    const [setLoadingItems, animatedStyle] = useLoadingAnim();

    const [data, setData] = useState([])
    useDataFetching(props.url, setData);
    return (

        <Animated.View style={[stylesRecentView.container, animatedStyle]} >
            {console.log(props.data)}
            <Text style={stylesRecentView.titleText}>{props.title}{"\n"}
                <Text style={stylesRecentView.subText}>{props.subtitle}</Text>
            </Text>



            {[...Array((maxHeight > Math.ceil(data.length / itemsPerLine) ? Math.ceil(data.length / itemsPerLine) : maxHeight))].map((_, rowIndex) => (
                <View key={rowIndex} style={stylesRecentView.rowContainer}>
                    {
                        data.slice(rowIndex * itemsPerLine, (rowIndex + 1) * itemsPerLine).map((item, pos) => (
                            <View style={{
                                borderBottomWidth: (rowIndex == (maxHeight - 1) ? 0 : 1),
                                borderRightWidth: (pos == (itemsPerLine - 1) ? 0 : 1),
                                borderColor: '#ECEFF1'
                            }}
                                key={pos}
                            >
                                <TouchableOpacity activeOpacity={0.85}>

                                    <Image
                                        key={item.id}
                                        source={{ uri: item.image[0].image }}
                                        style={stylesRecentView.imageView}
                                        onLoad={() => handleLoad(pos, setLoadingItems)}
                                        onLoadStart={() => handleLoadStart(pos, setLoadingItems)}
                                    />

                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            ))


            }
        </Animated.View >
    )
}

const stylesRecentView = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 445,
        paddingTop: theme.spacing.large,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rowContainer: {
        flexDirection: 'row',
    },
    imageView: {
        margin: 10,
        width: 100,
        height: 100,
    },
    titleText: {
        width: "100%",
        paddingLeft: theme.spacing.large,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize.header,
        fontWeight: 'bold',
        marginBottom: theme.spacing.medium,
        lineHeight: 26,
    },
    subText: {
        color: 'gray',
        fontWeight: 300,
        fontSize: theme.typography.fontSize.button
    }

})

export const MostProductsView = (props) => {
    const numberOfShow = 6
    const [data, setData] = useState([])
    useDataFetching(props.uri, setData)
    const [setLoadingItems, animatedStyle] = useLoadingAnim();

    return (
        <View style={stylesMostProductsView.container}>
            <Text style={stylesMostProductsView.titleText}>{props.title}</Text>
            <ScrollView horizontal={true} style={{ height: '100%' }} showsHorizontalScrollIndicator={false}>
                {
                    data.slice(0, (numberOfShow <= data.length ? numberOfShow : data.length)).map((item, index) =>
                        <MostProductsItem
                            key={index}
                            item={{ ...item, recDays: 1 }}
                            index={index}
                            onLoad={() => handleLoad(index, setLoadingItems)}
                            onLoadStart={() => handleLoadStart(index, setLoadingItems)}

                        />

                    )
                }
                {data.length >= numberOfShow &&
                    <TouchableOpacity style={{ ...stylesMostProductsView.item, justifyContent: 'center' }} activeOpacity={0.88}>
                        <View style={{ alignSelf: 'center' }}>

                            <Icon name="arrow-alt-circle-right" size={50} color={theme.colors.primary} />
                            <Text style={{}}>See All</Text>
                        </View>
                    </TouchableOpacity>
                }
            </ScrollView>

        </View >
    )
}

const MostProductsItem = (props) => {

    return (
        <TouchableOpacity style={stylesMostProductsView.item} activeOpacity={0.88}>
            <Image source={{ uri: props.item.image[0].image }} onLoad={props.onLoad} onLoadStart={props.onLoadStart} style={stylesMostProductsView.item.image} />
            <Text style={stylesMostProductsView.item.text} numberOfLines={2}>{props.item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Icon name="rocket" size={15} color={theme.colors.primary} />
                {props.item.recDays == 1 ?
                    <Text style={{ color: 'gray', marginLeft: 10 }}>
                        Send tomorrow
                    </Text>

                    :
                    <Text style={{ color: 'gray', marginLeft: 10 }}>
                        Send in {props.item.recDays} days
                    </Text>
                }
            </View>
            <ShowPrice price={props.item.price} discount={props.item.discount} />
        </TouchableOpacity >

    )
}

const stylesMostProductsView = StyleSheet.create({

    container: {
        width: screenWidth,
        height: 400,
        paddingTop: theme.spacing.large,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        width: "100%",
        paddingLeft: theme.spacing.large,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.fontSize.header,
        fontWeight: 'bold',
        marginBottom: theme.spacing.medium,
        lineHeight: 26,
    },
    item: {
        height: 330,
        width: 180,
        borderRightWidth: 1,
        borderColor: '#ECEFF1',
        padding: theme.spacing.large,
        justifyContent: 'space-between',
        image: {
            // marginTop: 20,
            width: 150,
            height: 150,
            marginBottom: 2,
            alignSelf: 'center',
        },
        text: {
            fontSize: theme.typography.fontSize.button,
            fontFamily: theme.typography.fontFamily,
            // marginLeft: 15,
            lineHeight: 20,
            height: 40,
        },
    },
})



export const componentsHeight = { CategoryCom: stylesCategoryCom.container.height, HomeScreenCategoriaclList: stylesCategoriaclList.container.height, RecentProductView: stylesRecentView.container.height, MostProductsView: stylesMostProductsView.container.height }