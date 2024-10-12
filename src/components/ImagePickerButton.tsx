import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { uploadData } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";

const ImageButton = () => {
  const pickImage = async () => {
    // Ask for permission to access media library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const { userId } = await getCurrentUser();

      try {
        result.assets.map(async (asset: any) => {
          console.log("asset", asset);
          const response = await fetch(asset.uri);
          const arrayBuffer = await response.arrayBuffer();

          // Generate a unique filename
          const filename = `${Date.now()}-${asset.uri.split("/").pop()}`;

          console.log("filename", filename);
          console.log("image response", response);
          await uploadData({
            path: `photos/${userId}/${filename}`,
            data: arrayBuffer,
          });

          Alert.alert("Success", "Images uploaded successfully!");
        });
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Floating Plus Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={pickImage}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#ff5722",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
});

export default ImageButton;
