import React, { useEffect, useState } from "react";
import { View } from "react-native";

import ImagePickerButton from "../components/ImagePickerButton";
import Gallery from "../components/ImageGallery";
import { getCurrentUser } from "aws-amplify/auth";
import { getUrl, list } from "aws-amplify/storage";

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
        result.items.map(async (item, index) => {
          const path = await getUrl({
            path: item.path,
          });
          return { id: index, url: path.url.toString() };
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
      <Gallery photos={photos} loading={loading} />
      <ImagePickerButton />
    </View>
  );
};

export default HomePage;
