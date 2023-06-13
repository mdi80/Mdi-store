import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { HomeScreenCategoriaclList, HomeScreenSuggestList, ImageButton, SearchBarHome } from "../component/home-screen-comp";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
const screenWidth = Dimensions.get('window').width;


const TitleViewCategoricalList = () => (
    <View style={styles.titleViewCatgoricalList}>
        <Text style={styles.titleViewCatgoricalList.text}>Amazing     </Text>
        <Text style={styles.titleViewCatgoricalList.text}>   Suggests </Text>
    </View>
)

export default function HomeScreen() {

    return (
        <View style={styles.container} >
            <SearchBarHome />
            <ScrollView>

                <Image source={require('../assets/p1.png')} style={styles.bannerImage} />

                <View style={styles.imageButtonStyles}>

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/d0dc31c892be8cf1408e4e14580b3f479da66bd1_1648897133.png' }} title="MDI Jet" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/625d8883f37944f3f0c4af5fe39435600931ab22_1664309850.png' }} title="MDI Pro" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/ac127167132653d14c758748b07824a6a7643a31_1663444619.png' }} title="MDI Pay" />
                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/555ad3336a60bbd1433dd7a999f4d487e96602d8_1680678388.png' }} title="MDI Srv" />

                </View>
                <HomeScreenCategoriaclList
                    hadleTitleView={<TitleViewCategoricalList />}
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor={theme.colors.primary}

                />
                <View style={styles.imageButtonStyles} >

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/d0dc31c892be8cf1408e4e14580b3f479da66bd1_1648897133.png' }} title="MDI Jet" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/625d8883f37944f3f0c4af5fe39435600931ab22_1664309850.png' }} title="MDI Pro" />

                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/ac127167132653d14c758748b07824a6a7643a31_1663444619.png' }} title="MDI Pay" />
                    <ImageButton src={{ uri: 'https://dkstatics-public.digikala.com/digikala-bellatrix/555ad3336a60bbd1433dd7a999f4d487e96602d8_1680678388.png' }} title="MDI Srv" />

                </View>

                <HomeScreenCategoriaclList
                    hadleTitleView={<TitleViewCategoricalList />}
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor={theme.colors.primary}
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
    bannerImage: {
        width: 360,
        height: 200,
        alignSelf: 'center',
        borderRadius: theme.raduis.large,
    },
    imageButtonStyles: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: theme.spacing.medium,
    },
    titleViewCatgoricalList: {
        margin: theme.spacing.small,
        paddingTop: theme.spacing.large,
        text: {
            fontFamily: theme.typography.fontFamily,
            color: 'white',
            fontSize: 30,
        }
    }
})