import React, { useEffect, useState } from "react";
import { View } from "react-native";

import ImagePickerButton from "../components/ImagePickerButton";
import Gallery from "../components/ImageGallery";
import { getCurrentUser } from "aws-amplify/auth";
import { getUrl, list, remove } from "aws-amplify/storage"; // import remove from aws-amplify/storage
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";

export interface Photo {
  id: number;
  url: string;
  isSelected: boolean;
  path: string;
}

const HomePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
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
          return {
            id: index,
            url: path.url.toString(),
            isSelected: false,
            path: item.path,
          };
        })
      );

      setPhotos(urls);
    } catch (error) {
      console.log("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPhotos = (newPhotos: Photo[]) => {
    setPhotos([...newPhotos, ...photos]);
  };

  const setSelect = () => {
    setIsSelecting(true);
  };

  const cancelSelect = () => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => ({ ...photo, isSelected: false }))
    );
    setIsSelecting(false);
  };

  const toggleSelection = (id: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id === id ? { ...photo, isSelected: !photo.isSelected } : photo
      )
    );
  };

  const deleteSelectedPhotos = async () => {
    try {
      const selectedPhotos = photos.filter((photo) => photo.isSelected);

      // Deleting from AWS S3
      const { userId } = await getCurrentUser();
      await Promise.all(
        selectedPhotos.map(async (photo) => {
          const filePath = photo.path;
          await remove({
            path: filePath,
          });
        })
      );

      // Remove selected photos from the local state
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => !photo.isSelected)
      );

      setIsSelecting(false);
    } catch (error) {
      console.error("Error deleting photos:", error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderBar
        isSelecting={isSelecting}
        setSelect={setSelect}
        cancelSelect={cancelSelect}
      />
      <Gallery
        photos={photos}
        loading={loading}
        isSelecting={isSelecting}
        toggleSelection={toggleSelection}
      />
      <ImagePickerButton isSelecting={isSelecting} addPhotos={addPhotos} />
      <FooterBar
        isSelecting={isSelecting}
        deleteSelectedPhotos={deleteSelectedPhotos}
      />
    </View>
  );
};

export default HomePage;
