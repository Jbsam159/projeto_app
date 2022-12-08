import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const UserPetList = ({ navigation }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-10 left-5 bg-[#f5f5f5] rounded-full py-1 px-2"
      >
        <Ionicons name="arrow-back-outline" size={24} color="#CCA46C" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserPetList;
