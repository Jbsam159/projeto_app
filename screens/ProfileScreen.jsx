import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Historico from "../components/Historico";
import { AuthContext } from "../contexts/userContext";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const { profilePic } = useContext(AuthContext);
  const [userDisplayName, setUserDisplayName] = useState("");

  const handleLogout = () => {
    auth.signOut();
    AsyncStorage.removeItem("@user");
    Toast.show({
      type: "info",
      text1: "Desconectado",
      text2: "Usuário desconectado",
    });
    navigation.navigate("Login");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const username = user.displayName;
        setUserDisplayName(username);
      } else {
      }
    });
  }, []);

  console.log(userDisplayName);

  return (
    <View>
      <SafeAreaView className="h-52 bg-[#CCA46C]">
        <Image
          resizeMode="contain"
          className="w-20 h-20 self-center"
          source={require("../assets/logo.png")}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate("PetList")}
          className="absolute top-10 right-4 bg-[#f5f5f5] rounded-full py-1 px-2"
        >
          <Ionicons name="list-outline" size={24} color="#CCA46C" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogout}
          className="absolute top-10 right-16 bg-[#f5f5f5] rounded-full py-1 px-2"
        >
          <MaterialIcons name="logout" size={24} color="#CCA46C" />
        </TouchableOpacity>
      </SafeAreaView>

      <View className="bg-white rounded -mt-6 mx-4 p-4 shadow border-[1.1px] border-[#CCA46C]">
        <View className="-mt-20 mb-4 rounded-full self-center shadow items-center justify-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135823.png",
            }}
            resizeMode="contain"
            className="h-24 w-24"
          />
          <Text className="text-lg text-gray-600 font-semibold">
            {userDisplayName}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          {/* Left */}
          <View className="flex-row items-center space-x-2 flex-1">
            <Ionicons name="ios-logo-instagram" size={20} color="gray" />
            <Ionicons name="logo-facebook" size={20} color="gray" />
            <Ionicons name="ios-logo-twitter" size={20} color="gray" />
          </View>

          {/* Center */}
          <View className="flex-1 flex-row items-center space-x-3">
            <View className="flex-row items-center">
              <Ionicons name="md-location-outline" size={20} color="gray" />
              <Text className="text-xs text-gray-400">USA</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="md-language" size={20} color="gray" />
              <Text className="text-xs text-gray-400">English</Text>
            </View>
          </View>

          {/* Right */}
          <View className="flex-1 items-end">
            <View className="flex-row items-center">
              <Entypo name="message" size={24} color="gray" />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          className="absolute top-3 right-3"
        >
          <Entypo name="edit" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-6">
        <Text className="text-2xl">Últimas atividades</Text>
      </View>

      <ScrollView
        horizontal={false}
        className="px-4 mt-2"
        showsVerticalScrollIndicator={false}
      >
        <Historico
          icon={<MaterialCommunityIcons name="dog" size={28} color="#CCA46C" />}
          status="ok"
          raca="Bulldog"
          date="12/09/2022"
          animal="cachorro"
        />
        <Historico
          icon={<MaterialCommunityIcons name="cat" size={28} color="#CCA46C" />}
          raca="Siamês"
          status="open"
          date="Em aberto"
          animal="gato"
        />
        <Historico
          icon={
            <MaterialCommunityIcons name="fish" size={28} color="#CCA46C" />
          }
          status="ok"
          raca="Baiacu"
          date="15/07/2022"
          animal="peixe"
        />
      </ScrollView>
    </View>
  );
}
