import React, { Component, useState, useEffect } from "react";
import {
  Alert,
  View,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { signUp } from "../firebase";
import { auth, db } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, setDoc } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { pickImage, askForPermission, uploadImage } from "../utils";
import { Button, Block, Input, Text } from "../components";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../constants";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState(null);
  const [passwords, setPasswords] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  async function handleSignUp() {
    Keyboard.dismiss();

    // check with backend API or with some static data
    await signUp(email, password);

    const user = auth.currentUser;
    // let photoURL;
    // if (selectedImage) {
    //   const { url } = await uploadImage(
    //     selectedImage,
    //     `images/${user.uid}`,
    //     "profilePicture"
    //   );
    //   photoURL = url;
    // }
    const userData = {
      displayName,
      email: user.email,
    };
    // if (photoURL) {
    //   userData.photoURL = photoURL;
    // }
    Alert.alert(
      "Success!",
      "Your account has been created",
      [
        {
          text: "Continue",
          onPress: () => {
            navigation.navigate("Browse");
          },
        },
      ],
      { cancelable: false }
    );
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return <Text>Loading</Text>;
  }
  if (permissionStatus !== "granted") {
    // return <Text>You need to allow this permission</Text>;
  }
  return (
    <KeyboardAvoidingView style={styles.signup} behavior="padding">
      {/* <View
        style={{
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        
        <TouchableOpacity
          onPress={handleProfilePicture}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons name="camera-plus" color="grey" size={45} />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
      </View> */}
      <Block padding={[0, theme.sizes.base * 2]}>
        <Text h1 bold>
          Sign Up
        </Text>
        <Block middle>
          <Input
            email
            label="Email"
            style={styles.input}
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label="Username"
            style={styles.input}
            defaultValue={displayName}
            onChangeText={(text) => displayName(text)}
          />
          <Input
            secure
            label="Password"
            style={styles.input}
            defaultValue={passwords}
            onChangeText={(text) => setPassword(text)}
          />

          <Button gradient onPress={handleSignUp}>
            <Text bold white center>
              Sign Up
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
});
