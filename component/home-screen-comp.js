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
} from 'react-native-reanimated';
import theme from "../theme";

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


export const HomeScreenCategoriaclList = (props) => {
    const [loadingImage, setLoadingImage] = useState([])
    const [data, setData] = useState([])
    const dispatch = useDispatch()

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



    const fetchData = () => {

        fetch(props.urlItems).then(res => res.json()).then(json => {
            setData(json)
        }).catch(error => {
            console.log(error);
            dispatch(setError({ networkError: true }))
        })

    }

    useEffect(() => {
        fetchData()
    }, [])


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
                                setLoadingImage={setLoadingImage} />
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
        <TouchableOpacity style={stylesCategoriaclList.itemView} activeOpacity={1}>
            <View>
                <Image
                    source={{ uri: item.image[0].image }}
                    style={stylesCategoriaclList.imageItem}
                    onLoadStart={() => handleLoadStart(index)}
                    onLoad={() => handleLoad(index)} />

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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View>
                        <Text
                            style={stylesCategoriaclList.textPriceItem}
                            ellipsizeMode="tail">
                            {parseFloat(item.price - item.discount) + " $"}
                        </Text>
                        <Text
                            style={stylesCategoriaclList.textPrimaryPriceItem}
                            ellipsizeMode="tail">{parseFloat(item.price)} $</Text>
                    </View>
                    <View>

                        <Text
                            style={stylesCategoriaclList.textDiscountPricePerItem}>
                            {parseInt(100 * (item.discount / item.price))}%
                        </Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}

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

    //tyles for List items
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


export const ImageButton = (props) => {
    const dispatch = useDispatch();

    return (
        <TouchableOpacity style={{ ...props.style, ...stylesImageButton.container }} activeOpacity={0.7} >
            <Image source={props.src} style={stylesImageButton.image} onError={() => dispatch(setError({ networkError: true }))} />
            <Text style={stylesImageButton.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const stylesImageButton = StyleSheet.create({
    container: {
        width: 90,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60
    },
    text: {
        fontWeight: 400,
        fontSize: theme.typography.fontSize.small,
        padding: theme.spacing.small,
    }
})

