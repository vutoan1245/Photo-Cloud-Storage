import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ImageGallery } from "@georstat/react-native-image-gallery";

// Define the type for a single photo object
type Photo = {
  id: number;
  url: string;
};

// Define the props for ImageGallery
interface GalleryProps {
  photos: Photo[];
  loading: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ photos, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const openGallery = (index: number) => {
    setInitialIndex(index);
    setIsOpen(true);
  };
  const closeGallery = () => setIsOpen(false);

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = (screenWidth - 9) / 4;

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.galleryContainer}>
            {photos.map((photo: Photo, index: number) => (
              <TouchableOpacity onPress={() => openGallery(index)}>
                <Image
                  key={photo.url}
                  source={{ uri: photo.url }}
                  style={[{ width: imageWidth, height: imageWidth }]}
                />
              </TouchableOpacity>
            ))}
          </View>
          <ImageGallery
            close={closeGallery}
            isOpen={isOpen}
            images={photos}
            initialIndex={initialIndex}
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    columnGap: 3,
    rowGap: 3,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Gallery;
