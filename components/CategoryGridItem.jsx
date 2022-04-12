import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";

const CategoryGridItem = ({ item, onSelect }) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableComponent style={{ flex: 1 }} onPress={onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: item.color } }}
        >
          <Text style={{ ...styles.title }}>{item.title} </Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15, // change
    height: Dimensions.get("window").height * 0.2,
    borderRadius: 10,
    overflow:
      Platform.OS === "android" && Platform.Version >= "21"
        ? "hidden"
        : "visible",
    elevation: 5,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "right",
    fontSize: 0.05 * Dimensions.get("window").width,
  },
});

export default CategoryGridItem;
