import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button, VirtualizedList } from "react-native";
import { CategoryCom, HomeScreenCategoriaclList, HomeScreenSuggestList, ImageButton, MostProductsView, RecentProductView, SearchBarHome, componentsHeight } from "../component/home-screen-comp";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const screenWidth = Dimensions.get('window').width;


const TitleViewCategoricalList = () => (
    <View style={styles.titleViewCatgoricalList}>
        <Text style={styles.titleViewCatgoricalList.text}>Amazing     </Text>
        <Text style={styles.titleViewCatgoricalList.text}>   Suggests </Text>
    </View>
)


export default function HomeScreen() {
    const homeScreenComponents = [
        { Comp: () => <Image source={require('../assets/p1.png')} style={styles.bannerImage} />, height: styles.bannerImage.height, key: 1 },

        { Comp: () => <CategoryCom urlItems="https://mdi80nz.pythonanywhere.com/api/get-categories/" />, height: componentsHeight.CategoryCom, key: 2 },
        {
            Comp: () => <HomeScreenCategoriaclList
                hadleTitleView={<TitleViewCategoricalList />}
                imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=1"
                backColor={theme.colors.primary}

            />, height: componentsHeight.HomeScreenCategoriaclList, key: 3
        },

        { Comp: () => <RecentProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=2" title="Recent Products" subtitle="Based on Recent views" />, height: componentsHeight.RecentProductView, key: 4 },

        { Comp: () => <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=3" title="Most Viewed" />, height: componentsHeight.MostProductsView, key: 5 },

        {
            Comp: () => <HomeScreenCategoriaclList
                hadleTitleView={<TitleViewCategoricalList />}
                imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=4"
                backColor={theme.colors.secondary}

            />, height: componentsHeight.HomeScreenCategoriaclList, key: 6
        },
        { Comp: ({ data }) => <RecentProductView data={data} url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=4" title="Digital Product" subtitle="Suggested Category" />, height: componentsHeight.RecentProductView, key: 7 },
        { Comp: () => <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=5" title="Top Sale" />, height: componentsHeight.MostProductsView, key: 8 },
        { Comp: () => <RecentProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" title="Mobile" subtitle="Suggested Category" />, height: componentsHeight.RecentProductView, key: 9 },
    ]



    const RenderParent = ({ item }) => {
        const [data, setdata] = useState("")

        useEffect(() => {
            setdata("here")
        })
        return (
            <View style={{ height: item.height }}>
                {/* {console.log(item.height)} */}
                <item.Comp data={data} />
            </View>
        )
    }

    const getComp = (data, index) => {
        return data[index]
    }
    return (
        <View style={styles.container} >
            <SearchBarHome />
            <VirtualizedList getItemCount={() => homeScreenComponents.length} getItem={getComp} data={homeScreenComponents} renderItem={({ item }) => <RenderParent item={item} />} keyExtractor={(item) => item.key} />

            <StatusBar style="auto" />
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