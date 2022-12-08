import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";

//___Components___//
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AddPetScreen from "./screens/AddPetScreen";
import AdoteScreen from "./screens/AdoteScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AdoptedScreen from "./screens/AdoptedScreen";
//__React Navigation__//
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AuthProvider from "./contexts/userContext";
import UserPetList from "./screens/UserPetList";
import EditProfile from "./screens/EditProfile";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PetDetail from "./screens/PetDetail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Adote">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign name="pluscircleo" size={24} color="#CCA46C" />
          ),
          tabBarLabel: "Cadastrar Pet",
          tabBarLabelStyle: { color: "#CCA46C" },
        }}
        name="Cadastrar Pet"
        component={AddPetScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={24} color="#CCA46C" />,
          tabBarLabel: "Perfil",
          tabBarLabelStyle: { color: "#CCA46C" },
        }}
        name="Perfil"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="list" size={24} color="#CCA46C" />,
          tabBarLabel: "Adote",
          tabBarLabelStyle: { color: "#CCA46C" },
        }}
        name="Adote"
        component={AdoteScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = AsyncStorage.getItem("@user");
    console.log("current user:" + currentUser);
    setUser(currentUser);
  }, []);

  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator
            initialRouteName={user != undefined ? "Actions" : "Login"}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="Register"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={{ headerShown: false, gestureEnabled: false }}
              name="Actions"
              component={MyTabs}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="PetList"
              component={UserPetList}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AdoptedScreen"
              component={AdoptedScreen}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="EditProfile"
              component={EditProfile}
            />
            <Stack.Screen
              options={{ headerShown: false, presentation: "modal" }}
              name="PetDetail"
              component={PetDetail}
            />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
      <Toast visibilityTime={2500} />
    </>
  );
}
