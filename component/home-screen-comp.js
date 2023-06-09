import { useEffect, useRef, useState } from "react";
import { BackHandler, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";
import { setError } from "../reducers/appReducer";
import Animated, {
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';


import theme from "../theme";
import { handleLoad, handleLoadStart, useDataFetching, useLoadingAnim } from "../utils";
import { useNavigation } from "@react-navigation/native";

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
                <View style={{ width: "100%", height: '100%', position: 'absolute', zIndex: 4 }}>
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
        backgroundColor: 'white',
        width: '100%',
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




export const HeaderComponent = (props) => {

    const handleImageSelect = (imageId) => {
        //TODO go to related page
    }





    const scrollY = props.scrollY;

    const compWidth = screenWidth

    const padding = (screenWidth + 100) / 100
    const itemWidth = (compWidth / 2 - (padding * 3))

    const scrollSnap = props.scrollSnap

    const inputRange2Dim = [0, scrollSnap]
    const inputRange3Dim = [0, scrollSnap / 2, scrollSnap]



    const animatedStyleContainer = useAnimatedStyle(() => {
        const height = interpolate(scrollY.value, inputRange2Dim, [itemWidth * 3 / 2 + 10, itemWidth * 3 / 8], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        const elevation = interpolate(scrollY.value, inputRange2Dim, [0, 2], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        return {
            height,
            elevation
        };
    });

    const animatedCompScale = useAnimatedStyle(() => {
        const width = interpolate(scrollY.value, inputRange3Dim, [itemWidth, itemWidth / 2.5, itemWidth / 2.5], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        const height = interpolate(scrollY.value, inputRange3Dim, [itemWidth * 3 / 4, itemWidth * 3 / 10, itemWidth * 3 / 10], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });

        return {

            width,
            height,
        };
    });

    const animatedCompRaduis = useAnimatedStyle(() => {
        const borderRadius = interpolate(scrollY.value, inputRange2Dim, [theme.raduis.large, theme.raduis.large * 1.5], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });

        return {
            borderRadius
        };
    });

    const animatedCompPos3 = useAnimatedStyle(() => {
        const left = interpolate(scrollY.value, inputRange3Dim, [padding, itemWidth / 2 + (padding * 3), itemWidth / 2 + (padding * 3)], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        const top = interpolate(scrollY.value, inputRange2Dim, [(3 * itemWidth / 4) + 5, 0], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        return {
            top,
            left
        };
    });
    const animatedCompPos4 = useAnimatedStyle(() => {
        const right = interpolate(scrollY.value, inputRange3Dim, [padding, itemWidth / 2 + (padding * 3), itemWidth / 2 + (padding * 3)], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        const top = interpolate(scrollY.value, inputRange2Dim, [(3 * itemWidth / 4) + 5, 0], { extrapolateLeft: Extrapolation.CLAMP, extrapolateRight: Extrapolation.CLAMP });
        return {
            top,
            right
        };
    });




    return (

        <Animated.View style={[{ zIndex: 3, top: 100, width: compWidth, position: 'absolute', backgroundColor: 'white' }, animatedStyleContainer]}>

            <Animated.View style={[{ ...stylesHeaderComp.animateImage, overflow: 'hidden', marginLeft: padding }, animatedCompScale, animatedCompRaduis]}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleImageSelect(props.data[0].id)}>

                    <Image source={{ uri: props.data[0].image }} style={{ ...stylesHeaderComp.image, zIndex: 0, width: '100%', height: "100%", resizeMode: 'contain' }} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[{ ...stylesHeaderComp.animateImage, overflow: 'hidden', right: padding }, animatedCompScale, animatedCompRaduis]}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleImageSelect(props.data[1].id)}>

                    <Image source={{ uri: props.data[1].image }} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%", resizeMode: 'contain' }} />

                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[{ ...stylesHeaderComp.animateImage, overflow: 'hidden' }, animatedCompRaduis, animatedCompScale, animatedCompPos3]}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleImageSelect(props.data[2].id)}>

                    <Image source={{ uri: props.data[2].image }} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%", resizeMode: 'contain' }} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[{ ...stylesHeaderComp.animateImage, overflow: 'hidden' }, animatedCompRaduis, animatedCompScale, animatedCompPos4]}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleImageSelect(props.data[3].id)}>
                    <Image source={{ uri: props.data[3].image }} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%", resizeMode: 'contain' }} />
                </TouchableOpacity>
            </Animated.View>
        </Animated.View >
        // </AnimReact.View>
    )
}

export const stylesHeaderComp = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    animateImage: {
        margin: 3,
        position: 'absolute',
    },
    image: {
    }
})


export const ScrollableRowList = (props) => {
    const [loadingImage, setLoadingImage] = useState([])

    const [data, setData] = useState([])
    useDataFetching(props.urlItems, setData)
    const [setLoadingItems, animatedStyle] = useLoadingAnim();


    return (
        <>
            <Animated.View style={[{ ...stylesScrollableRowList.container, backgroundColor: props.backColor }, animatedStyle]}>

                <ScrollView horizontal={true} style={{ height: '100%' }} showsHorizontalScrollIndicator={false}>
                    <View style={stylesScrollableRowList.titleItem}>
                        {props.hadleTitleView}
                        <Image source={{ uri: props.imageuri }} style={stylesScrollableRowList.titleItem.imageTitle} />
                        <TouchableOpacity style={stylesScrollableRowList.titleItem.btn}>
                            <Text style={{ color: 'white' }}>See All</Text>
                            <MaterialIcon name="arrow-right" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        data.map((item, index) =>
                            <ScrollableRowItem
                                key={index}
                                item={{ ...item, recDays: 1 }}
                                index={index}
                                setLoadingImage={setLoadingItems} />
                        )
                    }
                    {data.length >= 6 &&
                        <View style={stylesScrollableRowList.itemView}>
                            <View style={stylesScrollableRowList.itemViewSeeMore}>

                                <Icon name="arrow-alt-circle-right" size={50} color={theme.colors.primary} />
                                <Text style={stylesScrollableRowList.itemViewSeeMore.btn}>See All</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
            </Animated.View >

        </>
    )
}



const ScrollableRowItem = ({ item, setLoadingImage, index }) => {
    const handleLoadStart = (index) => {
        setLoadingImage(prevState => {
            let newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

    const handleLoad = (index) => {
        setLoadingImage(prevState => {
            let newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    };

    const navigation = useNavigation()
    return (
        <TouchableOpacity style={stylesScrollableRowList.itemView} activeOpacity={1} onPress={() => { navigation.navigate('Product', { product: item }) }}>
            <View>
                <Image
                    source={{ uri: item.image[0].image }}
                    style={stylesScrollableRowList.imageItem}
                    onLoadStart={() => handleLoadStart(index)}
                    onLoad={() => handleLoad(index)} />


                <Text
                    style={stylesScrollableRowList.titleTextItem}
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
                style={stylesScrollableRowList.textPriceItem}
                ellipsizeMode="tail">
                {parseFloat(price - discount) + " $"}
            </Text>
            {discount != 0 &&
                <Text
                    style={stylesScrollableRowList.textPrimaryPriceItem}
                    ellipsizeMode="tail">{parseFloat(price)} $</Text>
            }
        </View>
        <View>
            {discount != 0 &&
                <Text
                    style={stylesScrollableRowList.textDiscountPricePerItem}>
                    {(parseInt(100 * (discount / price)) == 0 ? 1 : parseInt(100 * (discount / price)))}%
                </Text>
            }
        </View>
    </View>
)

const stylesScrollableRowList = StyleSheet.create({
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


export const GridProductView = (props) => {
    const itemsPerLine = 3;
    const maxHeight = 3;
    const [setLoadingItems, animatedStyle] = useLoadingAnim();

    const [data, setData] = useState([])
    useDataFetching(props.url, setData);
    return (
        <Animated.View style={stylesGridProductView.container} >
            <Text style={stylesGridProductView.titleText}>{props.title}{"\n"}
                <Text style={stylesGridProductView.subText}>{props.subTitle}</Text>
            </Text>



            {[...Array((maxHeight > Math.ceil(data.length / itemsPerLine) ? Math.ceil(data.length / itemsPerLine) : maxHeight))].map((_, rowIndex) => (
                <View key={rowIndex} style={stylesGridProductView.rowContainer}>
                    {
                        data.slice(rowIndex * itemsPerLine, (rowIndex + 1) * itemsPerLine).map((item, pos) => (
                            <View key={item.id} style={{
                                borderBottomWidth: (rowIndex == (maxHeight - 1) ? 0 : 1),
                                borderRightWidth: (pos == (itemsPerLine - 1) ? 0 : 1),
                                borderColor: '#ECEFF1'
                            }}

                            >
                                <TouchableOpacity activeOpacity={0.85}>

                                    <Image

                                        source={{ uri: item.image[0].image }}
                                        style={stylesGridProductView.imageView}
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

const stylesGridProductView = StyleSheet.create({
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



export const componentsHeight = {
    CategoryCom: stylesCategoryCom.container.height,
    HomeScreenCategoriaclList: stylesScrollableRowList.container.height,
    RecentProductView: stylesGridProductView.container.height,
    MostProductsView: stylesMostProductsView.container.height
}

