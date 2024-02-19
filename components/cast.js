import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { image185 } from "../api/moviedb";

export default function Cast({ cast }) {
    const navigation = useNavigation();
    const characterName = "John Wick";
    const castName = "Keanu Reeves";
    return (
        <View className="my-6">
            <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast &&
                    cast.map((person, index) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.push('Person', person)} key={index} className="mr-4 items-center">
                                <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
                                    <Image
                                        // source={require("../assets/images/castImage.png")}
                                        source={{uri: image185(person.profile_path)}}
                                        className="w-20 h-24 rounded-2xl"
                                    />
                                </View>
                                <Text className="text-white text-xs mt-1">
                                    {person.character.length > 10 ? person.character.slice(0, 10) + "..." : person.character}
                                </Text>
                                <Text className="text-white text-xs mt-1">
                                    {person.name.length > 10 ? person.name.slice(0, 10) + "..." : person.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
            </ScrollView>
        </View>
    );
}
