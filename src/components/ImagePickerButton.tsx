import React, { useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadData } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";
import { Photo } from "../screens/HomeScreen";

interface ImageButtonProps {
  isSelecting: boolean;
  addPhotos: (photos: Photo[]) => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({
  isSelecting,
  addPhotos,
}) => {
  // Animation references
  const fadeAnim = useRef(new Animated.Value(1)).current; // for fade-in/out effect
  const scaleAnim = useRef(new Animated.Value(1)).current; // for scaling effect on press

  // Animate fade in or out when isSelecting changes
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isSelecting ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isSelecting]);

  const pickImage = async () => {
    // Trigger scaling animation when the button is pressed
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Ask for permission to access media library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const { userId } = await getCurrentUser();

      try {
        const uploadedPhotos: Photo[] = await Promise.all(
          result.assets.map(async (asset, index) => {
            const response = await fetch(asset.uri);
            const arrayBuffer = await response.arrayBuffer();

            // Generate a unique filename
            const filename = `${Date.now()}-${asset.uri.split("/").pop()}`;

            await uploadData({
              path: `photos/${userId}/${filename}`,
              data: arrayBuffer,
            });

            // Create Photo object for each uploaded image
            return {
              id: index,
              url: asset.uri,
              isSelected: false,
              path: `photos/${userId}/${filename}`,
            };
          })
        );

        // Call the addPhotos function with the uploaded photos
        addPhotos(uploadedPhotos);

        Alert.alert("Success", "Images uploaded successfully!");
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  return (
    <Animated.View
      style={[
        styles.floatingButton,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#553C90",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default ImageButton;
