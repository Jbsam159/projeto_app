import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Octicons,
  Ionicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { db, storage } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import Toast from "react-native-toast-message";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const AddPetScreen = ({ navigation }) => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petGender, setPetGender] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progressPerc, setProgressPerc] = useState(0);

  const storageRef = ref(storage, `files/${petName}`);
  const dbRef = collection(db, "animals");
  const data = {
    name: petName,
    gender: petGender,
    age: petAge,
    imgURL: image,
  };

  const handleSubmit = async () => {
    await addDoc(dbRef, data)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Sucesso!",
          text2: "Pet adicionado com sucesso",
        });
        navigation.navigate("Adote");
        setPetAge("");
        setPetName("");
        setPetGender("");
        setImage(null);
      })
      .catch((error) => {
        console.log(error);
      });

    const file = e.target[0]?.files[0];
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPerc(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    setImage(source);
  };

  const uploadImage = async (e) => {};

  return (
    <View>
      <SafeAreaView className="h-28 bg-[#CCA46C]">
        <Image
          resizeMode="contain"
          className="w-20 h-20 self-center"
          source={require("../assets/logo.png")}
        />
      </SafeAreaView>

      <View className="p-3 items-center flex-row border-[0.5px] border-gray-400 shadow bg-white self-center rounded-lg w-96 mt-3">
        <Image
          source={{ uri: image?.uri }}
          resizeMode="cover"
          className="w-20 h-20 rounded"
        />

        <View className="ml-3">
          <Text className="font-semibold text-xl">{petName}</Text>

          <View className="mt-2">
            <Text className="text-gray-400">Idade: {petAge}</Text>
            <Text className="text-gray-400">Gênero: {petGender}</Text>
          </View>
        </View>

        <View className="absolute top-3 right-2">
          <Feather name="more-vertical" size={20} color="gray" />
        </View>
      </View>

      <View className="items-center flex-row justify-between mx-4 mt-5">
        <Text className="text-2xl text-gray-500">Cadastro</Text>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#048050] px-3 py-2 rounded"
        >
          <Text className="text-white">Confirmar</Text>
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-3 mt-3 bg-white h-full">
          <View className="mb-3">
            <View>
              <Text className="text-xl text-gray-500">Foto</Text>
              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={pickImage}
                  className="border-[0.5px] bg-[#f5f5f5] rounded border-[#0484CC] w-32 px-2 py-1 flex-row items-center"
                >
                  <Text>
                    <FontAwesome name="photo" size={24} color="gray" />
                  </Text>
                  <Text className="ml-2 text-gray-500">Selecionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-xl text-gray-500">Nome</Text>
            <View className="flex-row items-center mt-1 border-[0.5px] border-[#CCA46C] p-2 rounded bg-[#f5f5f5]">
              <MaterialIcons name="pets" size={24} color="gray" />
              <TextInput
                value={petName}
                onChangeText={(value) => {
                  setPetName(value);
                }}
                placeholder="Nome do pet"
                className="flex-1 ml-2"
              />
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-xl text-gray-500">Idade</Text>
            <View className="flex-row items-center mt-1 border-[0.5px] border-[#CCA46C] p-2 rounded bg-[#f5f5f5]">
              <Octicons name="number" size={24} color="gray" />
              <TextInput
                value={petAge}
                onChangeText={(text) => {
                  setPetAge(text);
                }}
                placeholder="Idade do pet em anos*"
                className="flex-1 ml-2"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-xl text-gray-500">Gênero</Text>
            <View className="flex-row items-center mt-1 border-[0.5px] border-[#CCA46C] p-2 rounded bg-[#f5f5f5]">
              <Ionicons name="male-female-outline" size={24} color="gray" />
              <TextInput
                value={petGender}
                onChangeText={(text) => {
                  setPetGender(text);
                }}
                placeholder="Macho ou Fêmea"
                className="flex-1 ml-2"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AddPetScreen;
