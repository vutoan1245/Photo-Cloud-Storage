import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { list, getUrl } from "aws-amplify/storage";
import { getCurrentUser } from "aws-amplify/auth";

import ImagePickerButton from "../components/ImagePickerButton";

const HomePage = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async () => {
    try {
      const { userId } = await getCurrentUser();
      const result = await list({
        path: `photos/${userId}/`,
      });

      const urls = await Promise.all(
        result.items.map(async (item) => {
          const url = await getUrl({
            path: item.path,
          });
          return url.url;
        })
      );

      setPhotos(urls);
    } catch (error) {
      console.log("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.loadingIndicator} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.galleryContainer}>
            {photos.map((photo) => (
              <Image
                key={photo}
                source={{ uri: photo.toString() }}
                style={styles.image}
              />
            ))}
          </View>
        </ScrollView>
      )}

      {/* Floating Plus Button */}
      <ImagePickerButton />
    </View>
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

export default HomePage;
