import { useEffect, useRef, useState } from "react";
import { BackHandler, Button, Dimensions, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../reducers/appReducer";

const screenWidth = Dimensions.get('window').width;



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

        <TouchableWithoutFeedback onPress={clickOutside}>
            <View style={{ ...stylesSearchbar.searchBarRoot, flex: 1 }}>

                <View style={{ ...stylesSearchbar.searchBarRoot.textinputview }} >
                    <TouchableOpacity onPress={handleBackPress}>
                        <MaterialIcon name="arrow-back" size={25} color="#000" />
                    </TouchableOpacity>
                    <TextInput autoFocus={true} ref={inputtext} placeholder="Search" keyboardType="ascii-capable" style={stylesSearchbar.searchBarRoot.inputText} focusable={true} />

                </View>
            </View>
        </TouchableWithoutFeedback>

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
                            Search in <Text style={{ color: 'red' }}>MDI STORE</Text>
                        </Text>

                    </TouchableOpacity>
                </View>
            ) : (
                <SearchOpen setSearchFouc={setSearchFouc} />

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
            fontSize: 20,
            margin: 10,
            fontFamily: 'Roboto',
            marginLeft: 0,
        },
        searcharTouch: {
            margin: 10,
            marginTop: 40,
            height: 50,
            alignItems: 'center',
            borderRadius: 6,
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
            padding: 10,
            height: 45,
            borderRadius: 6,
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#00aaff'
        },
        inputText: {
            padding: 5,
            flex: 1,
            fontSize: 16,
            marginLeft: 10,
            height: 35,
        }
    }
})





export const HomeScreenCategoriaclList = (props) => {
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    const fetchData = () => {

        fetch(props.urlItems).then(res => res.json()).then(json => {
            
        }).catch(error => {
            console.log(error);
            dispatch(setError(true))
        })

    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <View style={{ ...stylesCategoriaclList.container, backgroundColor: props.backColor }}>
            <View style={{ justifyContent: 'space-between', height: 300, alignItems: 'center' }}>
                {props.hadleTitleView}
                <Image source={{ uri: props.uri }} style={{
                    width: 100
                    , height: 100
                }} />
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>See All</Text>
                    <MaterialIcon name="arrow-right" size={25} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}>
                {
                    props.data.map(item => <CategoricalItem item={item} />)
                }
            </ScrollView>
        </View>
    )
}


const CategoricalItem = ({ item }) => {

    return (
        <View>
            <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
            <Text style={{ maxWidth: '100%' }} numberOfLines={2} ellipsizeMode="tail">This is a long text that will be truncated if it exceeds two lines with three dots at the end.</Text>
        </View>
    )
}

const stylesCategoriaclList = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 400,
        flexDirection: 'row',
        alignItems: 'center'
    }
})




export const ImageButton = (props) => {


    return (
        <TouchableOpacity style={{ ...props.style, width: 90, height: 100, alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.7} >
            <Image source={props.src} style={{ width: 60, height: 60 }} />
            <Text style={{ fontWeight: 400, fontSize: 14, padding: 5 }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

