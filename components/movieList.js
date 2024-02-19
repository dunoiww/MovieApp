import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { image185, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const MovieList = ({ title, data, hideSeeAll }) => {
    let movieName = "Ant-man and the Wasp: Quantumania";
    const navigation = useNavigation();
    return (
        <View className="mb-8 space-y-4">
            <View className="flex-row mx-4 justify-between items-center">
                <Text className="text-white text-xl">{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text} className="text-lg">
                            See All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {data.map((item, index) => {
                    return (
                        <TouchableWithoutFeedback onPress={() => navigation.push("Movie", item)} key={index}>
                            <View className="space-y-1 mr-4">
                                <Image
                                    // source={require("../assets/images/moviePoster2.png")}
                                    source={{uri: image185(item.poster_path)}}
                                    style={{ width: width * 0.33, height: height * 0.22 }}
                                    className="rounded-3xl"
                                />
                                <Text numberOfLines={1} className="text-neutral-300 ml-1" style={{ width: 120 }}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default MovieList;
