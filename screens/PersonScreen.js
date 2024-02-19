import { View, Text, Platform, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styles, theme } from "../theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { getPersonDetails, getPersonMovies, image185, image342, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";

export default function PersonScreen() {
    const {params: person} = useRoute();
    const navigation = useNavigation();
    const [isFavorite, setIsFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(false);
    const [personDetails, setPersonDetails] = useState({});

    useEffect(() => {
        setLoading(true);
        fetchPersonDetails(person.id);
        fetchPersonMovies(person.id);
    }, [])

    const fetchPersonDetails = async (id) => {
        const data = await getPersonDetails(id);
        if (data) setPersonDetails(data);
        setLoading(false);
    }

    const fetchPersonMovies = async (id) => {
        const data = await getPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast);
        
    }

    const gender = personDetails.gender == 1 ? 'Female' : 'Male'

    return (
        <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.background}
                    className="rounded-xl p-1">
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                    <HeartIcon size={35} color={isFavorite ? "red" : "white"} />
                </TouchableOpacity>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <View>
                    <View
                        className="flex-row justify-center"
                        style={{
                            shadowColor: "gray",
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}>
                        <View className="overflow-hidden items-center rounded-full h-72 w-72 border-2 border-neutral-500">
                            <Image
                                // source={require("../assets/images/castImage.png")}
                                source={{uri: image500(person.profile_path)}}
                                style={{ width: width * 0.73, height: height * 0.41 }}
                            />
                        </View>
                    </View>

                    <View className="mt-6">
                        <Text className="text-white text-3xl text-center font-bold">{personDetails.name}</Text>
                        <Text className="text-base text-neutral-500 text-center">London, United Kingdom</Text>
                    </View>

                    <View className="mt-6 mx-3 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Gender</Text>
                            <Text className="text-neutral-300 text-sm">{gender}</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Birthday</Text>
                            <Text className="text-neutral-300 text-sm">{personDetails.birthday}</Text>
                        </View>
                        <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                            <Text className="text-white font-semibold">Known for</Text>
                            <Text className="text-neutral-300 text-sm">{personDetails.known_for_department}</Text>
                        </View>
                        <View className="px-2 items-center">
                            <Text className="text-white font-semibold">Popularity</Text>
                            <Text className="text-neutral-300 text-sm">{personDetails.popularity}</Text>
                        </View>
                    </View>

                    <View className="my-6 mx-4 space-y-2">
                        <Text className="text-white text-lg">Biography</Text>
                        <Text className="text-neutral-400 tracking-wide">
                            {personDetails.biography}
                        </Text>
                    </View>

                    <MovieList data={personMovies} title="Movies" hideSeeAll={true} />
                </View>
            )}
        </ScrollView>
    );
}
