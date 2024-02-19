import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { getTopRatedMovies, getTrendingMovies, getUpcomingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchTrendingMovies();
        fetchUpcomingMovies();
        fetchTopRatedMovies();
    }, [])

    const fetchTrendingMovies = async () => {
        const data = await getTrendingMovies();
        if (data && data.results) {
            setTrending(data.results);
        }
        setLoading(false);
    }
    const fetchUpcomingMovies = async () => {
        const data = await getUpcomingMovies();
        if (data && data.results) {
            setUpcoming(data.results);
        }
    }
    const fetchTopRatedMovies = async () => {
        const data = await getTopRatedMovies();
        if (data && data.results) {
            setTopRated(data.results);
        }
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon strokeWidth={2} color={"white"} size={30} />

                    <Text className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovie
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon strokeWidth={2} color={"white"} size={30} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <Loading />
            ) : (
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                    { trending.length > 0 && <TrendingMovies data={trending} /> }
                    { upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming} /> }
                    { topRated.length > 0 && <MovieList title="Top Rated" data={topRated} /> }
                </ScrollView>
            )}
        </View>
    );
};

export default HomeScreen;
