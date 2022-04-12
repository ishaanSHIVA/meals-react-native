import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DefaultText = ({ style, children }) => {
  return <Text style={{ fontFamily: "open-sans", ...style }}>{children}</Text>;
};

export default DefaultText;
