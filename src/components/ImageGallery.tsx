import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

const ImageGallery = ({ photos, loading }) => {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = (screenWidth - 9) / 4;

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.galleryContainer}>
            {photos.map((photo: any) => (
              <Image
                key={photo}
                source={{ uri: photo.uri.toString() }}
                style={[{ width: imageWidth, height: imageWidth }]}
              />
            ))}
          </View>
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

export default ImageGallery;
