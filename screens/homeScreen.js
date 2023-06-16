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

    const handleScroll = e => {
        console.log(e.nativeEvent.contentOffset.y);
        scrollY.setValue(e.nativeEvent.contentOffset.y)
    };

    const inputRange = [0, 250]
    const animatedHeight = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 4, (screenWidth / 2 - 10) * 3 / 10], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    const animatedWidth = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10), (screenWidth / 2 - 10) / 2.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    const animatedposY2 = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) + 5, 3 * (screenWidth / 2 - 10) / 2 + 2.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedposX3 = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [0, (screenWidth / 2 - 10) / 2 + 2.5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedposY3 = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(3 * (screenWidth / 2 - 10) / 4) + 5, 0], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });
    const animatedHeightContainer = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [(screenWidth / 2 - 10) * 3 / 2 + 10, (screenWidth / 2 - 10) * 3 / 8 + 5], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    const animatCor = scrollY.interpolate({
        inputRange: inputRange, // Adjust these values as per your requirements
        outputRange: [theme.raduis.large, theme.raduis.large * 2], // Adjust these values as per your requirements
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container} >
            <SearchBarHome />
            {/* <HeaderComponent animated={animatedStyle} setPosY={setPosY} /> */}


            <Animated.View style={{ height: animatedHeightContainer, backgroundColor: 'rgba(0,0,0,0)', position: 'relative' }}>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth, overflow: 'hidden', height: animatedHeight, borderRadius: animatCor }}>

                    <Image source={require("../assets/h1.webp")} style={{ ...stylesHeaderComp.image, zIndex: 0, width: '100%', height: "100%" }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth, overflow: 'hidden', height: animatedHeight, left: animatedposY2, borderRadius: animatCor }}>
                    <Image source={require("../assets/h2.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%" }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth, overflow: 'hidden', top: animatedposY3, height: animatedHeight, left: animatedposX3, borderRadius: animatCor }}>
                    <Image source={require("../assets/h3.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%" }} />
                </Animated.View>
                <Animated.View style={{ ...stylesHeaderComp.animateImage, width: animatedWidth, overflow: 'hidden', left: (screenWidth / 2 - 10) + 5, height: animatedHeight, top: animatedposY3, borderRadius: animatCor }}>
                    <Image source={require("../assets/h4.webp")} style={{ ...stylesHeaderComp.image, width: '100%', height: "100%" }} />
                </Animated.View>
            </Animated.View >
            <ScrollView onScroll={handleScroll} scrollEventThrottle={16} >


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