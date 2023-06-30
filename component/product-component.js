import { StyleSheet, View, Dimensions, Image } from 'react-native'
import { Carousel } from 'react-native-basic-carousel'
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export const ImageSliderProduct = (props) => {
    const ItemImageSlider = ({ index }) => {


        return (
            <View style={{ width: 200, height: 200 }}>
                <Image source={{ uri: imagesUrl[index].image }} style={{ width: 200, height: 200 }} />

            </View>
        )
    }
    const imagesUrl = props.imagesUrl;

    return (
        <View style={styles.container}>
            {console.log(imagesUrl.lenght)}
            <Carousel
                data={imagesUrl}
                renderItem={({ item, index }) => <ItemImageSlider index={index} />}
                itemWidth={screenWidth}
                onSnapItem={(item) => console.log(item)}
                pagination
                autoplay
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 500,
        backgroundColor: 'white'
    }
})