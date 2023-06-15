import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
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
import { useDataFetching } from "../utils";

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



export const HeaderComponent = (props) => {

    const image1 = useRef(null)
    const image2 = useRef(null)
    const image3 = useRef(null)
    const image4 = useRef(null)

    // const posX1 = useSharedValue(103)

    // const gestureHandler = Animated.event([{ nativeEvent: { translationY: posY1,translationX :  } }], {
    //     useNativeDriver: true,
    // });

    // const startAnimation = () => {
    //     posY1.value = withTiming();
    // };


    return (
        <View>
            <View style={stylesHeaderComp.rowContainer} onPress={() => { }}>
                {/* {console.log((1 + (props.pos > 89 ? 89 : props.pos) / 89))} */}
                <Animated.View style={{ ...props.animated, }}>
                    <Image source={require("../assets/h1.webp")} style={{ ...stylesHeaderComp.image1, width: '100%', height: "100%" }} ref={image1} />
                </Animated.View>
                {/* <Image source={require("../assets/h2.webp")} style={stylesHeaderComp.image2} ref={image2} /> */}
            </View>
            <View style={stylesHeaderComp.rowContainer}>

                {/* <Image source={require("../assets/h3.webp")} style={stylesHeaderComp.image3} ref={image3} />
                <Image source={require("../assets/h4.webp")} style={stylesHeaderComp.image4} ref={image4} /> */}
            </View>

        </View>
    )
}

const stylesHeaderComp = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    image1: {

        borderRadius: theme.raduis.large,
        position: 'absolute',
        left: 10,
        top: 10,
    },
    image2: {
        width: screenWidth / 2 - 10,
        height: (screenWidth / 2 - 10) * 3 / 4,
        borderRadius: theme.raduis.large,
        position: 'absolute',
        left: 10,
        top: 10,
    },
    image3: {
        width: screenWidth / 2 - 10,
        height: (screenWidth / 2 - 10) * 3 / 4,
        borderRadius: theme.raduis.large,
        position: 'absolute',
        left: 10,
        top: 10,
    },
    image4: {
        width: screenWidth / 2 - 10,
        height: (screenWidth / 2 - 10) * 3 / 4,
        borderRadius: theme.raduis.large,
        position: 'absolute',
        left: 10,
        top: 10,
    }
})


export const ScrollableRowList = (props) => {
    const [loadingImage, setLoadingImage] = useState([])
    const [data, setData] = useState([])
    useDataFetching(props.urlItems, setData)

    // Handle Animations of component
    const comOpacity = useSharedValue(0); // Initial opacity value
    const animateComponent = () => {
        comOpacity.value = withTiming(1, { duration: 400 }); // Fade-in animation with a duration of 1000ms
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: comOpacity.value, // Apply the animated opacity value to the component
        };
    });


    useEffect(() => {
        allImageLoaded()
    }, [loadingImage])


    const allImageLoaded = () => {
        let bool = true;
        if (loadingImage.length == 0) return false;
        loadingImage.forEach(i => {
            if (!i) bool = false;
        });

        if (bool) {
            animateComponent()
        }
        return bool
    }


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
                                setLoadingImage={setLoadingImage} />
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
    return (
        <TouchableOpacity style={stylesScrollableRowList.itemView} activeOpacity={1}>
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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View>
                        <Text
                            style={stylesScrollableRowList.textPriceItem}
                            ellipsizeMode="tail">
                            {parseFloat(item.price - item.discount) + " $"}
                        </Text>
                        <Text
                            style={stylesScrollableRowList.textPrimaryPriceItem}
                            ellipsizeMode="tail">{parseFloat(item.price)} $</Text>
                    </View>
                    <View>

                        <Text
                            style={stylesScrollableRowList.textDiscountPricePerItem}>
                            {parseInt(100 * (item.discount / item.price))}%
                        </Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

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
        padding: theme.spacing.small,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.raduis.medium,
    }
})


export const CategoryCom = (prop) => {
    const itemsPerLine = 3;
    const [data, setData] = useState([])
    useDataFetching(prop.urlItems, setData)


    return (
        <View style={{ ...stylesCategoryCom.container, height: 315 }}>
            <Text style={{
                justifyContent: 'center', alignSelf: 'center', fontSize: 1.5 * theme.typography.fontSize.header, fontWeight: 600, fontFamily: theme.typography.fontFamily
            }}>Categories</Text>
            {[...Array(Math.ceil(data.length / itemsPerLine))].map((_, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {data.slice(rowIndex * itemsPerLine, (rowIndex + 1) * itemsPerLine).map(item => (
                        <ImageButton key={item.id} src={{ uri: item.image }} title={item.title} />
                    ))}
                </View>
            ))}

        </View>
    )
}
export const ImageButton = (props) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={{ ...props.style, ...stylesCategoryCom.imageButton.container }} activeOpacity={0.7} >
            <Image source={props.src} style={stylesCategoryCom.imageButton.image} onError={() => dispatch(setError({ networkError: true }))} />
            <Text style={stylesCategoryCom.imageButton.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const stylesCategoryCom = StyleSheet.create({
    container: {
        width: screenWidth,
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

    const [data, setData] = useState([])
    useDataFetching(props.url, setData);
    return (
        <View style={stylesGridProductView.container} >
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
                                    />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            ))


            }
        </View >
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

    const [data, setData] = useState([])
    useDataFetching(props.uri, setData)

    return (
        <View style={stylesMostProductsView.container}>
            <Text style={stylesMostProductsView.titleText}>{props.title}</Text>
            <ScrollView horizontal={true} style={{ height: '100%' }} showsHorizontalScrollIndicator={false}>
                {
                    data.map((item, index) =>
                        <MostProductsItem
                            key={index}
                            item={{ ...item, recDays: 1 }}
                            index={index}
                        />
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

        </View >
    )
}

const MostProductsItem = (props) => {

    return (
        <View style={stylesMostProductsView.item}>
            <Image source={{ uri: props.item.image[0].image }} style={stylesMostProductsView.item.image} />
            <Text style={stylesMostProductsView.item.text}>{props.item.title}</Text>

        </View >

    )
}



const stylesMostProductsView = StyleSheet.create({

    container: {
        width: screenWidth,
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
        height: 300,
        width: 180,
        borderRightWidth: 1,
        borderColor: '#ECEFF1',
        image: {
            marginTop: 20,
            width: 150,
            height: 150,
            alignSelf: 'center',
        },
        text: {
            fontSize: theme.typography.fontSize.button + 2,
            fontFamily: theme.typography.fontFamily,
            marginLeft: 15,
        },
    },
})



