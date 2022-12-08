import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import NoPetFound from "../components/NoPetFound";
import PetCard from "../components/PetCard";
import { db } from "../services/firebase";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function AdoteScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const petsCollectionRef = collection(db, "animals");
  console.log(pets);

  // const handleDelete = async (id) => {
  //   await deleteDoc(doc(db, "animals", id))
  //     .then(console.log("Sucesso"))
  //     .catch((error) => console.log(error));
  // };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setPets(pets);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    const getPets = async () => {
      const data = await getDocs(petsCollectionRef);
      setPets(data.docs.map((item) => ({ ...item.data(), id: item.id })));
    };

    getPets();
  }, []);

  return (
    <View>
      <SafeAreaView className="h-28">
        <Image
          resizeMode="contain"
          className="w-20 h-20 self-center"
          source={require("../assets/logo.png")}
        />
      </SafeAreaView>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="py-4"
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <Text className="ml-5 text-2xl text-gray-500">Pets para adoção</Text>

        {pets?.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            img={pet.imgURL}
            name={pet.name}
            age={pet.age}
            gender={pet.gender}
            imgUrl={pet.imgUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
}
