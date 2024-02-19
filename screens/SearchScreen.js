import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import Loading from "../components/loading";
import { image185, image342, searchMovie } from "../api/moviedb";
import {debounce} from 'lodash';

const { width, height } = Dimensions.get("window");

export default function SearchScreen() {
    const navigation = useNavigation();
    let movieName = "Ant-man and the Wasp: Quantumania";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSeach = (value) => {
        if (value && value.length > 2) {
            setLoading(true)
            searchMovie({
                query: value,
                include_adult: 'false',
                page: '1',
                language: 'en-US'
            }).then(data => {
                setLoading(false)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSeach, 400), [])

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput
                    placeholder="Search Movies..."
                    placeholderTextColor={"lightgray"}
                    className="pb-1 pl-6 flex-1 text-base text-white font-semibold tracking-wider"
                    onChangeText={handleTextDebounce}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                    className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size={25} color={"white"} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <Loading />
            ) : results.length > 0 ? (
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    showsVerticalScrollIndicator={false}
                    className="space-y-3">
                    <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
                    <View className="flex-row justify-between flex-wrap">
                        {results.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => navigation.push("Movie", item)}>
                                    <View className="space-y-2 mb-4">
                                        <Image
                                            className="rounded-3xl"
                                            // source={require("../assets/images/moviePoster2.png")}
                                            source={{uri: image185(item.poster_path)}}
                                            style={{ width: width * 0.45, height: height * 0.3 }}
                                        />
                                        <Text
                                            className="text-neutral-300 ml-1"
                                            numberOfLines={1}
                                            style={{ width: 160 }}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </View>
                </ScrollView>
            ) : (
                <View className="flex justify-center">
                    <Image source={require("../assets/images/movieTime.png")} className="w-96 h-96" />
                    <Text className="text-white font-semibold text-sm text-center mr-4">
                        OOps! Your movies is not here...
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}
