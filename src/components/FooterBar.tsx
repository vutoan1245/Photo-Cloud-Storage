import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from "react-native";

interface FooterBarProps {
  deleteSelectedPhotos: () => void;
  isSelecting: boolean;
}

const FooterBar: React.FC<FooterBarProps> = ({
  deleteSelectedPhotos,
  isSelecting,
}) => {
  // Animated value for sliding the footer bar
  const slideAnim = useRef(new Animated.Value(100)).current;

  // Animate the footer bar when isSelecting is toggled
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSelecting ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSelecting]);

  return (
    <Animated.View
      style={[
        styles.footerContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <TouchableOpacity
        onPress={deleteSelectedPhotos}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
  },
});

export default FooterBar;
