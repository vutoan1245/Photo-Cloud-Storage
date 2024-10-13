import React from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import HomePage from "./src/screens/HomeScreen";
import outputs from "./amplify_outputs.json";

Amplify.configure(outputs);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={require("./assets/select-icon.png")} // Left aligned icon
          style={styles.icon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={signOut}>
        <Image
          source={require("./assets/signout-icon.png")} // Right aligned icon
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView style={styles.container}>
          <SignOutButton />
          <HomePage />
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row", // Aligns items in a row
    justifyContent: "space-between", // Pushes icons to opposite ends
    alignItems: "center", // Vertically centers the icons
    paddingHorizontal: 20, // Add horizontal padding to the container
    paddingBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default App;
