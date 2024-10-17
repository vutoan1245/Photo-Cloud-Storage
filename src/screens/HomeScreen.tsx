import React, { useEffect, useState } from "react";
import { View } from "react-native";

import ImagePickerButton from "../components/ImagePickerButton";
import Gallery from "../components/ImageGallery";
import { getCurrentUser } from "aws-amplify/auth";
import { getUrl, list } from "aws-amplify/storage";

// Define the type for each photo object
interface Photo {
  id: number;
  url: string;
}

const HomePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]); // Use the Photo type here
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async () => {
    try {
      const { userId } = await getCurrentUser();
      const result = await list({
        path: `photos/${userId}/`,
      });

      const urls: Photo[] = await Promise.all(
        result.items.map(async (item, index): Promise<Photo> => {
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
