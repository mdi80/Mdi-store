import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { CategoryCom, HomeScreenCategoriaclList, HomeScreenSuggestList, ImageButton, MostProductsView, RecentProductView, SearchBarHome } from "../component/home-screen-comp";
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
            <ScrollView >

                <Image source={require('../assets/p1.png')} style={styles.bannerImage} />

                <CategoryCom urlItems="https://mdi80nz.pythonanywhere.com/api/get-categories/" />

                <HomeScreenCategoriaclList
                    hadleTitleView={<TitleViewCategoricalList />}
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor={theme.colors.primary}

                />

                <RecentProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" />

                <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" title="Most Views" />

                <View style={{ height: 200 }}></View>
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