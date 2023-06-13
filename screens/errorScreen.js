import { StatusBar } from 'expo-status-bar';
import 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ErrorScreen = () => {



    return (
        <View style={{ justifyContent: 'space-between', flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("../assets/disconnect.png")} style={{ width: 100, height: 100 }} />
                <Text style={{ fontFamily: 'Roboto', fontSize: 20, fontWeight: 'bold', color: "#3700b3" }}>Connection Faild</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <TouchableOpacity style={{ padding: 15, backgroundColor: '#3700b3', width: 300, alignItems: 'center', borderRadius: 10 }} activeOpacity={0.9}>
                    <Text style={{ fontFamily: 'Roboto', fontSize: 15, color: 'white' }}>Try again</Text>
                </TouchableOpacity>
            </View>

            <StatusBar />
        </View>
    )
}

export default ErrorScreen;