import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";
import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";

const FavouritesScreen = ({ navigation }) => {
  const MEALS = useSelector(({ meals }) => meals.meals);
  const FavMeals = useSelector(({ meals }) => meals.favMeals);

  if (FavMeals.length > 0) {
    return <MealList listData={FavMeals} navigation={navigation} />;
  }
  return (
    <View style={styles.noContent}>
      <DefaultText>No favorite meals found. Start adding some!</DefaultText>
    </View>
  );
};

FavouritesScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Meal"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  noContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritesScreen;
