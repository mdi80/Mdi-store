import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { AddToStoreBtn, CommentComp, CommentsProduct, HeaderProduct, ProductColor, ProductDesc, ProductDetails, ProductFeatures } from '../component/product-component'
import ImageSlider from '../component/imageSlider'
import { FlatList } from 'react-native-gesture-handler'
import { MostProductsView } from '../component/home-screen-comp'
import { BarIndicator } from 'react-native-indicators';
import { useDataFetching } from '../utils'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar'
import theme from '../theme'
import { useSelector } from 'react-redux'
import Toast from 'react-native-toast-message';





export default function AddCommentScreen({ navigation, route }) {

    const [likeStatus, setLikeStatus] = useState(true)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const token = useSelector(state => state.auth.token)
    const handleAddCommet = (e) => {
        setLoading(true)
        setErrorMessage("")
        if (comment == "") {
            setLoading(false)
            setErrorMessage("Comment is required!")
            return;
        }

        fetch("https://mdi80nz.pythonanywhere.com/api/add-comment/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Token ' + token,
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                comment: comment,
                liked: likeStatus ? 1 : 0,
                productId: route.params.productId
            })
        })
            .then(res => {
                if (res.ok) {
                    navigation.goBack()
                } else {
                    return res.json()
                }
            }).then(text => {
                throw Error(text)
            })
            .catch(e => {
                console.log(e.message);
                setErrorMessage(e.message)

            }).finally(() => {
                setLoading(false)
            })


    }
    return (
        <View style={styles.container}>
            <StatusBar />
            <View >
                <View style={{ width: '100%', height: 60, paddingTop: 30, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 40, paddingLeft: 30, paddingRight: 30 }}>
                        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5, borderRadius: 10, backgroundColor: (likeStatus ? theme.colors.primary : 'white'), flexDirection: 'row', width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => setLikeStatus(true)}>
                            <AntDesign name="like1" color={(likeStatus ? 'white' : 'black')} size={20} />
                            <Text style={{ marginLeft: 5, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: (likeStatus ? 'white' : 'black') }}>
                                Like
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5, borderRadius: 10, backgroundColor: (!likeStatus ? 'red' : 'white'), flexDirection: 'row', width: 100, justifyContent: 'center', alignItems: 'center' }} onPress={() => setLikeStatus(false)}>
                            <AntDesign name="dislike1" color={(!likeStatus ? 'white' : 'black')} size={20} />
                            <Text style={{ marginLeft: 5, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: (!likeStatus ? 'white' : 'black') }}>
                                Disike
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', height: 200, padding: 30 }}>

                    <Text style={{ marginBottom: 10, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.header, fontWeight: 'bold' }}>Comment</Text>
                    <TextInput value={comment} onChangeText={(e) => setComment(e)} textAlignVertical='top' multiline maxLength={2000} style={{ padding: 10, backgroundColor: '#eee', width: "100%", height: "100%", borderRadius: 10 }} />
                </View>
            </View>
            <View>

                <Text
                    style={{ alignSelf: 'center', marginBottom: 2, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: 'red' }}
                >
                    {errorMessage}
                </Text>
                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity disabled={loading} activeOpacity={0.8} onPress={handleAddCommet} style={{ height: 60, borderRadius: 10, backgroundColor: theme.colors.primary, flexDirection: 'row', width: 300, justifyContent: 'center', alignItems: 'center' }}>
                        {loading ?
                            <BarIndicator size={15} color="white" />
                            :
                            <Text
                                style={{ marginLeft: 5, fontFamily: theme.typography.fontFamily, fontSize: theme.typography.fontSize.button, color: 'white' }}
                            >Add Comment</Text>
                        }
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },

})