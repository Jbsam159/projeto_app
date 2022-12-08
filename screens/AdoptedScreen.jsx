import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function AdoptedScreen({ navigation }) {
    const {
        params: { name },
    } = useRoute();

    return (
        <View className="flex-1 bg-[#CCA46C] items-center justify-center">
            <Animatable.View
                animation="slideInUp"
                iterationCount={1}
                className="items-center justify-center mx-8"
            >
                <AntDesign name="checkcircleo" size={20} color="white" />
                <Text className="mt-4 text-white font-bold text-lg mb-1">
                    Pedido para adoção confirmado
                </Text>
                <Text className="text-center text-gray-100 text-xs">
                    O pedido para adotar o pet {name} está sendo analizado pela nossa
                    equipe.
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Actions");
                    }}
                    className="mt-4 px-5 py-2 bg-white rounded-full"
                >
                    <Text className="text-[#CCA46C] font-semibold">OK</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}