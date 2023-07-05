import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button, Animated, VirtualizedList, FlatList } from "react-native";
import { CategoryCom, GridProductView, ScrollableRowList, MostProductsView, SearchBarHome, HeaderComponent, componentsHeight } from "../component/home-screen-comp";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const screenWidth = Dimensions.get('window').width;


const TitleViewScrollableList = () => (
    <View style={styles.titleViewScrollableList}>
        <Text style={styles.titleViewScrollableList.text}>Amazing     </Text>
        <Text style={styles.titleViewScrollableList.text}>   Suggests </Text>
    </View>
)


const imageHeaderData = [
    { id: 1, image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/fbb8693242a28dc5da78de43bfc765dc1a2ac9fa_1688462031.jpg?x-oss-process=image/quality,q_95/format,webp" },
    { id: 2, image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/6ffa5c9aa0fdf023c5011766d39708b828af10f7_1687875626.jpg?x-oss-process=image/quality,q_95/format,webp" },
    { id: 3, image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/798082ab645726f660e0130a78b14c86b9bcd336_1684071126.jpg?x-oss-process=image/quality,q_95/format,webp" },
    { id: 4, image: "https://dkstatics-public.digikala.com/digikala-adservice-banners/d31a80d2ea931f08317b726b74cf417ffe0c2a6f_1688478968.jpg?x-oss-process=image/quality,q_95/format,webp" },
]
export default function HomeScreen() {

    const homeScreenComponents = [

        { Comp: () => <CategoryCom urlItems="https://mdi80nz.pythonanywhere.com/api/get-categories/" />, height: componentsHeight.CategoryCom, key: 2 },
        {
            Comp: () => <ScrollableRowList
                hadleTitleView={<TitleViewScrollableList />}
                imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=1"
                backColor={theme.colors.primary}

            />, height: componentsHeight.ScrollableRowList, key: 3
        },

        { Comp: () => <GridProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=2" title="Recent Products" subtitle="Based on Recent views" />, height: componentsHeight.GridProductView, key: 4 },

        { Comp: () => <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=3" title="Most Viewed" />, height: componentsHeight.MostProductsView, key: 5 },

        {
            Comp: () => <ScrollableRowList
                hadleTitleView={<TitleViewScrollableList />}
                imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=4"
                backColor={theme.colors.secondary}


            />, height: componentsHeight.ScrollableRowList, key: 6
        },
        { Comp: ({ data }) => <GridProductView data={data} url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=4" title="Digital Product" subtitle="Suggested Category" />, height: componentsHeight.RecentProductView, key: 7 },
        { Comp: () => <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=5" title="Top Sale" />, height: componentsHeight.GridProductView, key: 8 },
        { Comp: () => <GridProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" title="Mobile" subtitle="Suggested Category" />, height: componentsHeight.RecentProductView, key: 9 },

    ]


    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollSnap = 200
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );



    const RenderParent = ({ item }) => (
        <View style={{ height: item.height }}>
            <item.Comp />
        </View>
    )

    return (
        <View style={styles.container} >
            <SearchBarHome />
            <HeaderComponent scrollY={scrollY} scrollSnap={scrollSnap} data={imageHeaderData} />

            <ScrollView
                onScroll={handleScroll}
                contentContainerStyle={{ paddingTop: 300 }}
                scrollEventThrottle={32}
                snapToOffsets={[0, scrollSnap + 50]}
                decelerationRate="normal"
                snapToEnd={false}>
                {homeScreenComponents.map((item, index) => (
                    <item.Comp key={index} />
                ))}
            </ScrollView>

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
    titleViewScrollableList: {
        margin: theme.spacing.small,
        paddingTop: theme.spacing.large,
        text: {
            fontFamily: theme.typography.fontFamily,
            color: 'white',
            fontSize: 30,
        }
    }
})