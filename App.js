import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react'
import { enableScreens } from 'react-native-screens';


// FONT
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

enableScreens()

import MealNavigator from "./navigation/MealsNavigator"

export default function App() {

  const fetchFonts = async () => {
    await Font.loadAsync({
      "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
  };
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <MealNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
