import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Switch, Platform } from "react-native";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Colors } from "../constants/Colors";
import { setFilter } from "../store/actions/meals";

const ToggleComponent = ({ title, state, setState }) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{title}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={state}
        onValueChange={setState}
      />
    </View>
  );
};

const FilterScreen = ({ navigation }) => {
  const [isGlutenFree, setGlutenFree] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [isVegetarian, setVegetarian] = useState(false);
  const [isLactoseFree, setLactoseFree] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      isLactoseFree: isLactoseFree,
      isVegan: isVegan,
      isGlutenFree: isGlutenFree,
      isVegetarian: isVegetarian,
    };

    dispatch(setFilter(appliedFilters));

    console.log(appliedFilters);
  }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree, dispatch]);

  useEffect(() => {
    saveFilters();
    navigation.setParams({ save: saveFilters });
  }, [isGlutenFree, isVegan, isVegetarian, isLactoseFree]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Restrictions / Filters</Text>
      <ToggleComponent
        title="Gluten-free"
        state={isGlutenFree}
        setState={(newValue) => setGlutenFree(newValue)}
      />

      <ToggleComponent
        title="Vegan"
        state={isVegan}
        setState={(newValue) => setVegan(newValue)}
      />

      <ToggleComponent
        title="Lactose-free"
        state={isLactoseFree}
        setState={(newValue) => setLactoseFree(newValue)}
      />
      <ToggleComponent
        title="Vegetarian"
        state={isVegetarian}
        setState={(newValue) => setVegetarian(newValue)}
      />
    </View>
  );
};
FilterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Filter Screen",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navigation.getParam("save")}
        />
      </HeaderButtons>
    ),

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
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignItems: "center",
    marginVertical: 20,
  },
});

export default FilterScreen;
