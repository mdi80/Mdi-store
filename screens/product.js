import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'


export const handleToProductPage = (id) => {
    const navigation = useNavigation();
    navigation.navigate('Product')
}


export default function ProductScreen({ navigation }) {

    return (
        <View>
            <Text>hell</Text>

        </View>
    )
}