import { View, Text, Image } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const PetDetail = () => {
  const {
    params: { name, age, gender, img },
  } = useRoute();

  return (
    <View>
      <Image source={img} className="w-full h-72" />

      <View className="py-3 px-5 items-center flex-row justify-between">
        <Text className="text-2xl text-gray-500">{name}</Text>
        <View className="space-y-1">
          <Text className="text-gray-500">{age} ano(s)</Text>
          <Text className="text-gray-500">{gender}</Text>
        </View>
      </View>
    </View>
  );
};

export default PetDetail;
