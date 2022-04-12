import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummyData";

import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = ({ navigation }) => {
  const catID = navigation.getParam("categoryId");

  const AvaliableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayMEALS = AvaliableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catID) >= 0
  );

  if (displayMEALS.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DefaultText>No Meals found.Try to change filters 😁</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayMEALS} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = ({ navigation }) => {
  const catID = navigation.getParam("categoryId");

  const selectedCategory = CATEGORIES.find((category) => category.id === catID);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({});

export default CategoryMealsScreen;
