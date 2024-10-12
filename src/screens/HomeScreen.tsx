import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import ImageButton from "../components/ImagePickerButton";

const HomePage = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Display the selected images */}

      {/* Floating Plus Button */}
      <ImageButton />
    </View>
  );
};

export default HomePage;
