import React from "react";
import { View } from "react-native";

import ImagePickerButton from "../components/ImagePickerButton";
import ImageGallery from "../components/ImageGallery";

const HomePage = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageGallery />
      <ImagePickerButton />
    </View>
  );
};

export default HomePage;
