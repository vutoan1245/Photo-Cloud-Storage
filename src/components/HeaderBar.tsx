import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

interface HeaderBarProps {
  isSelecting: boolean;
  setSelect: () => void;
  cancelSelect: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  isSelecting,
  setSelect,
  cancelSelect,
}) => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.headerContainer}>
      {!isSelecting ? (
        <TouchableOpacity
          onPress={() => {
            setSelect();
          }}
        >
          <Image
            source={require("../../assets/select-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => cancelSelect()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={signOut}>
        <Image
          source={require("../../assets/signout-icon.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default HeaderBar;
