import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { CategoryCom, GridProductView, ScrollableRowList, HomeScreenSuggestList, ImageButton, MostProductsView, SearchBarHome, HeaderComponent } from "../component/home-screen-comp";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useState } from "react";
const screenWidth = Dimensions.get('window').width;


const TitleViewScrollableList = () => (
    <View style={styles.titleViewScrollableList}>
        <Text style={styles.titleViewScrollableList.text}>Amazing     </Text>
        <Text style={styles.titleViewScrollableList.text}>   Suggests </Text>
    </View>
)


export default function HomeScreen() {
    const [posY, setPosY] = useState(0)
    const width = useSharedValue(screenWidth / 2 - 10)
    const height = useSharedValue((screenWidth / 2 - 10) * 3 / 4)
    const onscroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y)
        // Access and use the properties as needed
        // width.value = (103 - event.nativeEvent.contentOffset.y) / 89
        setPosY(event.nativeEvent.contentOffset.y)
        width.value = width.value / (1 + (posY > 89 ? 89 : posY) / 89)
        height.value = height.value / (1 + (posY > 89 ? 89 : posY) / 89)
    }
    const animatedStyle = useAnimatedStyle(() => {
        return {
            // transform: [{ posY1: posY1.value }],
            width: width.value,
            height: height.value,
        };
    });


    return (
        <View style={styles.container} >
            <SearchBarHome />
            <HeaderComponent animated={animatedStyle} setPosY={setPosY} />
            <ScrollView onScroll={onscroll}>

                {/* <Image source={require('../assets/p1.png')} style={styles.bannerImage} /> */}
                <View style={{ height: 300 }}></View>
                <CategoryCom urlItems="https://mdi80nz.pythonanywhere.com/api/get-categories/" />

                <ScrollableRowList
                    hadleTitleView={<TitleViewScrollableList />}
                    imageuri="https://www.digikala.com/statics/img/png/specialCarousel/box.png"
                    urlItems="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6"
                    backColor={theme.colors.primary}

                />

                <GridProductView url="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" title="Recent products" subTitle="Based on Recent views" />

                <MostProductsView uri="https://mdi80nz.pythonanywhere.com/api/get-product-with-param/?amazing?rows=6" title="Most Sales" />
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