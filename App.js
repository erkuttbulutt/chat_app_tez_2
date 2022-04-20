import React, { useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatList from "./screens/ChatList";
import Settings from "./screens/Settings";
import Chat from "./screens/Chat";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { DefaultTheme, Provider } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX6hlOfFiNA3Wr33zEOhJl5fms2rL7DSQ",
  authDomain: "chat-app-tez-ii.firebaseapp.com",
  projectId: "chat-app-tez-ii",
  storageBucket: "chat-app-tez-ii.appspot.com",
  messagingSenderId: "797798996134",
  appId: "1:797798996134:web:a4e4c1a141e6539791bc67",
};

firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
  }, []);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name == "Sohbetler" ? "chatbubbles" : "settings"}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="Sohbetler" component={ChatList} />
      <Tabs.Screen name="Ayarlar" component={Settings} />
    </Tabs.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2196f3",
    accent: "#e91e63",
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
