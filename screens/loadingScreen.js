import { Image, Text, View } from "react-native"
import { BarIndicator } from 'react-native-indicators';
import theme from "../theme";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { log } from "react-native-reanimated";

export default function LoadingScreen({ navigation, route, style }) {


    // const params = route.params
    // let screen;
    // console.log(route);
    // if (!route.params) {
    //     screen = 'Home'
    // } else {
    //     screen = params.screen
    // }

    // const preloadImages = async (images) => {

    //     const imagePromises = images.map((source) => {
    //         return Image.prefetch(source);
    //     });

    //     await Promise.all(imagePromises);
    // };


    // useEffect(() => {
    //     navigation.navigate(screen)
    //     // const images = data.product.image.map((item, index) => item.image)
    //     // console.log('start');
    //     // preloadImages(images)
    //     // console.log('end');
    //     // const timer = setTimeout(() => {

    //     //     navigation.navigate(screen, data)

    //     // }, 2000);
    //     // return () => clearTimeout(timer);

    // }, [])

    return (
        <View style={{
            height: '100%', position: 'absolute', zIndex: 5, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
        }}>
            <StatusBar />
            <BarIndicator color={theme.colors.primary} size={30} />
        </ View>
    )
}