import 'react'
import { Image, View } from 'react-native'
const ErrorScreen = () => {



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: "https://www.flaticon.com/free-icons/no-internet" }} style={{ width: 200, height: 200 }} />
        </View>
    )
}

export default ErrorScreen;