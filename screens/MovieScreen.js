import { View, Text, ScrollView, TouchableOpacity, Platform, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { getMovieCredits, getMovieDetails, getSimilarMovies, image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : " mt-3";

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavorite, setIsFavorite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    let movieName = "Ant-man and the Wasp: Quantumania";
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        fetchMovieDetails(item.id);
        fetchMovieCredits(item.id);
        fetchSimilarMovies(item.id);
    }, [item]);

    const fetchMovieDetails = async (id) => {
        const data = await getMovieDetails(id);
        if (data) setMovie(data);
        setLoading(false);
    };

    const fetchMovieCredits = async (id) => {
        const data = await getMovieCredits(id);
        if (data && data.cast) setCast(data.cast);
    };

    const fetchSimilarMovies = async (id) => {
        const data = await getSimilarMovies(id);
        if (data && data.results) setSimilarMovies(data.results);
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
            <View className="w-full">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.background}
                        className="rounded-xl p-1">
                        <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                        <HeartIcon size={35} color={isFavorite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                {loading ? (
                    <Loading />
                ) : (
                    <View>
                        <Image
                            // source={require("../assets/images/moviePoster2.png")}
                            source={{ uri: image500(movie.poster_path) }}
                            style={{ width: width, height: height * 0.55 }}
                        />
                        <LinearGradient
                            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
                            style={{ width: width, height: height * 0.4 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                )}
            </View>

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white font-bold text-3xl text-center tracking-wider">{movie.title}</Text>

                {movie.id ? (
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        {movie.status} ・ {movie.release_date.split("-")[0]} ・ {movie.runtime} min
                    </Text>
                ) : null}

                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-bold text-base text-center">{genre.name} {showDot ? '・' : null}</Text>
                            )
                        })
                    }
                </View>

                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {movie.overview}
                </Text>
            </View>

            {cast.length > 0 && <Cast cast={cast} /> }

            {similarMovies.length > 0 && <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />}
        </ScrollView>
    );
}
