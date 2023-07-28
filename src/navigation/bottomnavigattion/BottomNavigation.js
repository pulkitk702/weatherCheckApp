import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import ListScreen from "../../screens/ListScreen/ListScreen";
import WhishlistScreen from "../../screens/WishListScreen/WhishlistScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
const cityListScreen = "Cities";

const wishListScreen = "WhishList";

const Tab = createBottomTabNavigator();
function BottomNavigation() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "red",
    },
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarScrollEnabled: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === cityListScreen) {
            return (iconName = focused ? (
              <MaterialIcon name="city-variant" size={30} color="red" />
            ) : (
              <MaterialIcon name="city-variant-outline" size={30} />
            ));
          } else if (rn === wishListScreen) {
            return (iconName = focused ? (
              <Icon name="heart" size={30} color="red" />
            ) : (
              <Icon name="heart-o" size={30} />
            ));
          }

          // You can return any component that you like here!
        },
      })}
      ScreenOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 8, fontSize: 8 },

        style: {
          padding: 50,
          height: 8,
        },
      }}
    >
      <Tab.Screen
        name={"Cities"}
        component={ListScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name={"WhishList"}
        component={WhishlistScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;
