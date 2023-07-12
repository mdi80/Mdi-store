import { StatusBar } from 'expo-status-bar';
import 'react'
import { useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../reducers/appReducer';
import Toast from 'react-native-toast-message';


const ErrorScreen = () => {

    const [tryagain, settryagain] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const testConnectionToServer = () => {
        try {
            fetch("https://mdi80nz.pythonanywhere.com/api/get-categories/", {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + token
                }
            }).then(res => {
                if (res.ok) {
                    dispatch(setError({ networkError: false }))
                } else {
                    throw Error("Unknown Error!")
                }
            }).catch(error => {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: error.message,
                })
                settryagain(false)
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            })
            settryagain(false)
        }
    }

    const handleTryagain = () => {
        settryagain(true)
        Toast.hide()
        testConnectionToServer()
    }

    return (
        <View style={{ justifyContent: 'space-between', flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../assets/disconnect.png")} style={{ width: 100, height: 100 }} />
                <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: "#3700b3" }}>Connection Faild</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <TouchableOpacity style={{ height: 50, backgroundColor: '#3700b3', width: 300, alignItems: 'center', borderRadius: 10, justifyContent: 'center' }} activeOpacity={0.9} onPress={handleTryagain}>
                    {tryagain ?
                        <ActivityIndicator size='small' color="white" />
                        :
                        <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Try again</Text>
                    }
                </TouchableOpacity>
            </View>

            <StatusBar />
            <Toast setRef={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

export default ErrorScreen;