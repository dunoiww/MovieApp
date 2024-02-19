import { Dimensions, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const TrendingMovies = ({ data }) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    return (
        <View className="mb-8">
            <Text className="text-white mx-4 text-xl mb-5">Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.6}
                loop={true}
                slideStyle={{ display: "flex", alignItems: "center" }}
            />
        </View>
    );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={require("../assets/images/moviePoster.png")}
                source={{uri: image500(item.poster_path)}}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    );
};
