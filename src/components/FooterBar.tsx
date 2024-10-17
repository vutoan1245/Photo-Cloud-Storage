import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface FooterBarProps {
  deleteSelectedPhotos: () => void;
  isSelecting: boolean;
}

const FooterBar: React.FC<FooterBarProps> = ({
  deleteSelectedPhotos,
  isSelecting,
}) => {
  if (!isSelecting) {
    return null; // Only show the footer when in selecting mode
  }

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={deleteSelectedPhotos}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
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
    alignItems: "flex-end", // Align text to the right
    paddingRight: 20, // Add padding to the right for spacing
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: "red", // Set the text color to red
    fontSize: 16,
  },
});

export default FooterBar;
