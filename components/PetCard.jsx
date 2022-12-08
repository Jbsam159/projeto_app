import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const PetCard = ({ name, age, gender, img }) => {
  const navigation = useNavigation();

  return (
    <View className="bg-white w-96 rounded self-center mt-3 shadow mb-5">
      <TouchableOpacity
        // onPress={handleDelete(id)}
        className="py-1 px-2 bg-white rounded-full shadow absolute top-2 right-2 z-10"
      >
        <FontAwesome name="trash-o" size={20} color="#CCA46C" />
      </TouchableOpacity>

      <Image
        source={img}
        resizeMode="cover"
        className="w-full h-28 rounded-t"
      />

      <View className="py-3 px-4 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl text-gray-500">{name}</Text>
          <View className="mt-2">
            <Text className="text-gray-400 text-xs">{age} ano(s)</Text>
            <Text className="text-gray-400 text-xs">{gender}</Text>
          </View>
        </View>

        <View className="space-y-1">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PetDetail", {
                name,
                age,
                gender,
                img,
              });
            }}
            className="items-center justify-center border rounded px-3 py-2 border-[#0484cc]"
          >
            <Text className="text-[#0484cc]">Ver detalhes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate("AdoptedScreen", {

              name,

            })
          }} className="bg-[#04844C] rounded px-3 items-center justify-center py-2">

            <Text className="text-white font-semibold">Adotar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PetCard;
