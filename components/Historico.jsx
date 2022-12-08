import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Historico = ({ raca, date, animal, icon, status }) => {
  return (
    <View className="bg-white border-[1.1px] border-[#CCA46C] p-4 rounded shadow mb-2 flex-row items-center justify-between">
      {icon}
      <View className="ml-3 flex-1">
        <Text className="text-gray-600 text-lg font-semibold">
          Adotou um {animal}
        </Text>
        <Text className="text-gray-400">Raça: {raca}</Text>
        <Text className="text-gray-400">Em: {date}</Text>
      </View>
      {status === "ok" ? (
        <AntDesign name="checkcircle" size={20} color="#048444" />
      ) : (
        <AntDesign name="infocirlce" size={20} color="#FCCC04" />
      )}

      <View className="absolute top-2 right-2">
        <Entypo name="dots-three-vertical" size={16} color="gray" />
      </View>
    </View>
  );
};

export default Historico;
