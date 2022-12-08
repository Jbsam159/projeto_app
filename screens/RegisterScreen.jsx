import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [error, setError] = useState("");

  async function handleRegister() {
    if (email && password && username && confirmPassword) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          await updateProfile(auth.currentUser, {
            displayName: username,
          });
          Toast.show({
            type: "success",
            text1: "Registrado",
            text2: "Usuário registrado",
          });
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log(error);
          setError("Email já registrado!");
        });
    } else {
      Toast.show({
        type: "info",
        text1: "Ocorreu um erro",
        text2: "Preencha todos os campos",
      });
    }
  }
  return (
    <SafeAreaView className="bg-white">
      <View className={`px-4 bg-white ${Platform.OS === "android" && "mt-5"}`}>
        <Image
          className="w-32 h-32 self-center"
          resizeMode="contain"
          source={require("../assets/logo.png")}
        />
        <View className="self-center w-full mx-4 h-full">
          <KeyboardAvoidingView behavior="position">
            <Text className="text-4xl text-gray-500">Registrar</Text>
            {error && (
              <View className="bg-red-400 py-1 rounded-full">
                <Text className="text-white font-semibold self-center">
                  {error}
                </Text>
              </View>
            )}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="mt-4">
                <Text className="text-xl text-gray-500">Nome de usuário</Text>

                <View className="bg-[#f5f5f5] px-1 border-[0.5px] border-[#CCA46C] flex-row items-center outline-none py-3 rounded">
                  <MaterialIcons name="person" size={24} color="gray" />
                  <TextInput
                    className="flex-grow ml-2 text-[#CCA46C]"
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Nome de usuário"
                    value={username}
                  />
                </View>

                <Text className="mt-4 text-xl text-gray-500">E-Mail</Text>

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

                <Text className="text-xl mt-4  text-gray-500">
                  Confirmar senha
                </Text>
                <View
                  className={`px-1 flex-row items-center bg-[#f5f5f5] border-[0.5px] border-[#CCA46C] outline-none py-3 rounded ${confirmPassword != password && "border-[#FF0000]"
                    }`}
                >
                  <MaterialIcons name="lock" size={24} color="gray" />
                  <TextInput
                    className="flex-grow ml-2 text-[#CCA46C]"
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    placeholder="Confirme a senha"
                    secureTextEntry={hideConfirmPassword}
                  />
                  <TouchableOpacity
                    disabled={!confirmPassword}
                    onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                    className={`${!confirmPassword && "opacity-30"}`}
                  >
                    {hideConfirmPassword ? (
                      <Ionicons name="eye" color="#000" size={24} />
                    ) : (
                      <Ionicons name="eye-off" color="#000" size={24} />
                    )}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  disabled={
                    !password &&
                    !email &&
                    !username &&
                    confirmPassword != password
                  }
                  className={`self-center shadow rounded mt-6 bg-[#CCA46C] w-full py-3 ${!confirmPassword && "opacity-70"
                    }`}
                  onPress={handleRegister}
                >
                  <Text className="font-semibold text-xl text-center text-white">
                    Registrar-se
                  </Text>
                </TouchableOpacity>

                <View className="self-center mt-4 flex-row space-x-1">
                  <Text>Já possui uma conta?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text className="text-[#CCA46C]">Entrar</Text>
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
