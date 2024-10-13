import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const ImageGallery = ({ photos, loading }) => {
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
                style={styles.image}
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
    justifyContent: "center",
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ImageGallery;
