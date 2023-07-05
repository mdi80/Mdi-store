import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Dimensions, Button, Animated } from "react-native";
import { CategoryCom, GridProductView, ScrollableRowList, HomeScreenSuggestList, ImageButton, MostProductsView, SearchBarHome, HeaderComponent, stylesHeaderComp } from "../component/home-screen-comp";
import { ScrollView } from "react-native-gesture-handler";
import theme from "../theme";
import { useRef, useState } from "react";
const screenWidth = Dimensions.get('window').width;


const TitleViewScrollableList = () => (
    <View style={styles.titleViewScrollableList}>
        <Text style={styles.titleViewScrollableList.text}>Amazing     </Text>
        <Text style={styles.titleViewScrollableList.text}>   Suggests </Text>
    </View>
)


export default function HomeScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
    );

    const scrollSnap = 250

    const inputRange = [0, scrollSnap]
    const inputRange2 = [0, scrollSnap / 2, scrollSnap]
    const animatedHeight = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 4, (screenWidth / 2 - 10) * 3 / 10], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedHeight1 = scrollY.interpolate({
        inputRange: inputRange2, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 4, (screenWidth / 2 - 10) * 3 / 10, (screenWidth / 2 - 10) * 3 / 10], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    const animatedHeight2 = scrollY.interpolate({
        inputRange: inputRange2, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 4, (screenWidth / 2 - 10) * 3 / 4, (screenWidth / 2 - 10) * 3 / 10], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });


    const animatedWidth1 = scrollY.interpolate({
        inputRange: inputRange2, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10), (screenWidth / 2 - 10) / 2.5, (screenWidth / 2 - 10) / 2.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedposX34 = scrollY.interpolate({
        inputRange: inputRange2, // Adjust these values as per your requirements
        outputRange: [4, (screenWidth / 2 - 10) / 2 + 10, (screenWidth / 2 - 10) / 2 + 12.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedposY3 = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(3 * (screenWidth / 2 - 10) / 4) + 5, 0], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedHeightContainer = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 2 + 10, (screenWidth / 2 - 10) * 3 / 8 ], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    const animatCor = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [theme.raduis.large, theme.raduis.large * 1.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const elevation = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [0, 2], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.container} >
            <SearchBarHome />
            {/* <HeaderComponent animated={animatedStyle} setPosY={setPosY} /> */}


            <Animated.View style={{ height: animatedHeightContainer, zIndex: 2, position: 'absolute', top: 100, width: "100%", backgroundColor: 'white', elevation }}>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth1, overflow: 'hidden', height: animatedHeight1, left: 4, borderRadius: animatCor }}>

                    <Image source={require("../assets/h1.webp")} style={{ ...stylesHeaderComp.image, zIndex: 0, width: '100%', height: "100%", resizeMode: 'contain' }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth1, overflow: 'hidden', height: animatedHeight1, right: 4, borderRadius: animatCor }}>
                    <Image source={require("../assets/h2.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%", resizeMode: 'contain' }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth1, overflow: 'hidden', top: animatedposY3, height: animatedHeight1, left: animatedposX34, borderRadius: animatCor }}>
                    <Image source={require("../assets/h3.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%" }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth1, overflow: 'hidden', right: animatedposX34, height: animatedHeight1, top: animatedposY3, borderRadius: animatCor }}>
                    <Image source={require("../assets/h4.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%" }} />
                </Animated.View>
            </Animated.View >
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16} contentContainerStyle={{ paddingTop: 300 }} snapToOffsets={[0, scrollSnap]} decelerationRate="normal" snapToEnd={false}>

                {/* <Animated.View style={{ height: animatedScrollHight }}>

                </Animated.View> */}
                {/* <Image source={require('../assets/p1.png')} style={styles.bannerImage} /> */}
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
        </View >
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