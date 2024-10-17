import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadData } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";
import { Photo } from "../screens/HomeScreen";

interface ImageButtonProps {
  addPhotos: (photos: Photo[]) => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ addPhotos }) => {
  const pickImage = async () => {
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
    <TouchableOpacity style={styles.floatingButton} onPress={pickImage}>
      <Text style={styles.floatingButtonText}>+</Text>
    </TouchableOpacity>
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
