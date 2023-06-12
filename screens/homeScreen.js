import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { HomeScreenCategoriaclList, HomeScreenSuggestList, ImageButton, SearchBarHome } from "../component/home-screen-comp";
import { ScrollView } from "react-native-gesture-handler";
const screenWidth = Dimensions.get('window').width;


export default function HomeScreen() {

    return (
        <View style={styles.container} >
            <SearchBarHome />
            <ScrollView>

                <Image source={require('../assets/p1.png')} style={{ width: 360, height: 200, alignSelf: 'center', borderRadius: 15 }} />

                <View style={{ width: screenWidth, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/d0dc31c892be8cf1408e4e14580b3f479da66bd1_1648897133.png' }} title="MDI Jet" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/625d8883f37944f3f0c4af5fe39435600931ab22_1664309850.png' }} title="MDI Pro" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/ac127167132653d14c758748b07824a6a7643a31_1663444619.png' }} title="MDI Pay" />
                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/555ad3336a60bbd1433dd7a999f4d487e96602d8_1680678388.png' }} title="MDI Srv" />

                </View>
                <HomeScreenCategoriaclList
                    hadleTitleView={
                        <View style={{ paddingTop: 30 }}>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 30, fontWeight: 'bold' }}>Amazing     </Text>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 30, fontWeight: 'bold' }}>   Suggests </Text>
                        </View>
                    }
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor="#3700b3"

                />
                <View style={{ width: screenWidth, flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/d0dc31c892be8cf1408e4e14580b3f479da66bd1_1648897133.png' }} title="MDI Jet" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/625d8883f37944f3f0c4af5fe39435600931ab22_1664309850.png' }} title="MDI Pro" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/ac127167132653d14c758748b07824a6a7643a31_1663444619.png' }} title="MDI Pay" />
                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/555ad3336a60bbd1433dd7a999f4d487e96602d8_1680678388.png' }} title="MDI Srv" />

                </View>

                <HomeScreenCategoriaclList
                    hadleTitleView={
                        <View style={{ margin: 10, paddingTop: 20 }}>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 30 }}>Amazing     </Text>
                            <Text style={{ fontFamily: 'Roboto', color: 'white', fontSize: 30 }}>   Suggests </Text>
                        </View>
                    }
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor="#008302"
                />

                <StatusBar style="auto" />
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',

    }
})