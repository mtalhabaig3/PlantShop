import React, { Component, useState, useEffect } from "react";
import { Text } from "react-native";
import { AsyncStorage } from "react-native";

const Cart = () => {
  const [result, setresult] = useState("");
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("1");
      setresult(value);
    })();
  }, []);

  return <Text style={{ fontSize: 18 }}>1. {result}</Text>;
};

export default Cart;
