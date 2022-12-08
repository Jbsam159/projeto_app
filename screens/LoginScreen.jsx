import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const currentUser = userCredential.user;
          const JsonValue = JSON.stringify(currentUser);
          AsyncStorage.setItem("@user", JsonValue);
          Toast.show({
            type: "success",
            text1: "Conectado",
            text2: "Usuário conectado",
          });
          navigation.navigate("Actions");
        })
        .catch((error) => {
          console.log(error);
          setError("Email ou senha incorretos!");
        });
    }
  }

  return (
    <SafeAreaView className="bg-white">
      <View className={`px-4 bg-white ${Platform.OS === "android" && "mt-5"}`}>
        <Image
          className="w-40 h-40 self-center"
          resizeMode="contain"
          source={require("../assets/logo.png")}
        />
        <View className="self-center w-full mx-4 mt-10 h-full">
          <KeyboardAvoidingView behavior="position">
            <Text className="text-4xl text-gray-500">Login</Text>
            {error && (
              <View className="bg-red-400 py-1 rounded-full">
                <Text className="text-white font-semibold self-center">
                  {error}
                </Text>
              </View>
            )}

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="mt-4">
                <Text className="text-xl text-gray-500">E-Mail</Text>

                <View className="bg-[#f5f5f5] px-1 border-[0.5px] border-[#CCA46C] flex-row items-center outline-none py-3 rounded">
                  <MaterialIcons name="email" size={24} color="gray" />
                  <TextInput
                    className="flex-grow ml-2 text-[#CCA46C]"
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    value={email}
                    keyboardType="email-address"
                  />
                </View>

                <Text className="text-xl mt-4  text-gray-500">Senha</Text>
                <View className="px-1 flex-row items-center bg-[#f5f5f5] border-[0.5px] border-[#CCA46C] outline-none py-3 rounded">
                  <MaterialIcons name="lock" size={24} color="gray" />
                  <TextInput
                    className="flex-grow ml-2 text-[#CCA46C]"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder="Senha"
                    secureTextEntry={hidePassword}
                  />
                  <TouchableOpacity
                    disabled={!password}
                    onPress={() => setHidePassword(!hidePassword)}
                    className={`${!password && "opacity-30"}`}
                  >
                    {hidePassword ? (
                      <Ionicons name="eye" color="#000" size={24} />
                    ) : (
                      <Ionicons name="eye-off" color="#000" size={24} />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className="self-center shadow rounded mt-6 bg-[#CCA46C] w-full py-3"
                  onPress={handleLogin}
                >
                  <Text className="font-semibold text-xl text-center text-white">
                    Login
                  </Text>
                </TouchableOpacity>

                <View className="self-center mt-4 flex-row space-x-1">
                  <Text>Não possui uma conta?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text className="text-[#CCA46C]">Registrar-se</Text>
                  </TouchableOpacity>
                </View>

                <Text className="self-center mt-5 text-gray-300">
                  Get A Pet &copy;2022
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </View>
    </SafeAreaView>
  );
}
