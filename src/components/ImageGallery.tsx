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

type Photo = {
  id: number;
  url: string;
  isSelected: boolean;
};

interface GalleryProps {
  photos: Photo[];
  loading: boolean;
  isSelecting: boolean;
  toggleSelection: (id: number) => void;
}

const Gallery: React.FC<GalleryProps> = ({
  photos,
  loading,
  isSelecting,
  toggleSelection,
}) => {
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
              <TouchableOpacity
                key={photo.id}
                onPress={() => {
                  if (isSelecting) {
                    toggleSelection(photo.id);
                  } else {
                    openGallery(index);
                  }
                }}
              >
                <Image
                  source={{ uri: photo.url }}
                  style={[
                    { width: imageWidth, height: imageWidth },
                    photo.isSelected && styles.selectedPhoto,
                  ]}
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
  selectedPhoto: {
    borderColor: "blue",
    borderWidth: 3,
  },
});

export default Gallery;
