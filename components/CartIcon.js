import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CartIcon() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{
        position: "absolute",
        right: 20,
        bottom: 10,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: "maroon",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name="cart"
        size={30}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
}
