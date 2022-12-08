import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";

const EditProfile = () => {
  const [userDisplayName, setUserDisplayName] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  function updateProfileCredentials() {
    updateProfile(auth.currentUser, {
      displayName: userDisplayName,
    })
      .then(() => {
        console.log("sucesso");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <View></View>
    </>
  );
};

export default EditProfile;
