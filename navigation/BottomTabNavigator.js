import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default class BottomTabNavigator extends React.Component {
  render() {
    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{inactiveBackgroundColor:"#2E2C3A", activeBackgroundColor:"#2E2C3A",adaptive:"true"}}>
        <BottomTab.Screen
          name="Home"
          component={PostsScreen}
          options={{
            tabBarLabel: "Discover",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="map-marker"
                color="white"
                size={size}
              />
            )
          }}
        />

        <BottomTab.Screen
          name="Post"
          component={CreatePostScreen}
          options={{
            tabBarLabel: "New Post",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-plus"
                color="white"
                size={size}
              />
            )
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle"
                color="white"
                size={size}
              />
            )
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
