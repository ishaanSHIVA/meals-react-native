import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FilterScreen from "../screens/FilterScreen";
import { Colors } from "../constants/Colors";

const navigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitlesStyle: {
    fontFamily: "open-sans",
  },
};

const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories",
      },
    },
    CategoryMeal: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    mode: "modal",
    defaultNavigationOptions: navigationOptions,
  }
);

const favNavigator = createStackNavigator(
  {
    Favorites: FavouritesScreen,
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: navigationOptions,
  }
);

const MealsTab = {
  Meals: {
    screen: MealNavigator,
    navigationOptions: {
      tabBarColor: Colors.primaryColor,
      tabBarIcon: (tabInfo) => (
        <Ionicons
          name="ios-restaurant"
          size={25}
          color={tabInfo.tintColor}
        ></Ionicons>
      ),
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
        ) : (
          "Meals"
        ),
    },
  },
  Favourite: {
    screen: favNavigator,
    navigationOptions: {
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
        ) : (
          "Favorites"
        ),
      tabBarColor: Colors.accentColor,
      tabBarIcon: ({ tintColor }) => {
        return (
          <Ionicons name="ios-star" size={25} color={tintColor}></Ionicons>
        );
      },
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android" && Platform.OS !== "web"
    ? createMaterialBottomTabNavigator(MealsTab, {
        activeTintColor: Colors.accentColor,
        shifting: true,
      })
    : createBottomTabNavigator(MealsTab, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.accentColor,
        },
      });

const filterNavigator = createStackNavigator(
  {
    Filters: FilterScreen,
  },
  {
    defaultNavigationOptions: navigationOptions,
    navigationOptions: {
      drawerLabel: "Filters",
    },
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Meals: MealsFavTabNavigator,
    Filter: filterNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans",
        flex: 1,
        marginVertical: 50,
      },
    },
  }
);

export default createAppContainer(MainNavigator);
