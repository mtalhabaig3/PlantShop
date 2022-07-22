import React, { useState, useEffect } from "react";
import { Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import Browse from "../screens/Browse";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Cart from "../screens/Cart";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import { theme } from "../constants";

const Stack = createNativeStackNavigator();

function Navigation() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      } else {
        setCurrUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} /> */}
          <Stack.Screen
            name="Browse"
            component={Browse}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default Navigation;

// const screens = createStackNavigator(

//   {
//     Welcome,
//     Login,
//     SignUp,
//     Forgot,
//     Explore,
//     Browse,
//     Product,
//     Settings
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: theme.sizes.base * 5,
//         backgroundColor: theme.colors.white, // or 'white
//         borderBottomColor: "transparent",
//         elevation: 0 // for android
//       },
//       headerBackImage: <Image source={require("../assets/icons/back.png")} />,
//       headerBackTitle: " ",
//       headerLeftContainerStyle: {
//         alignItems: "center",
//         marginLeft: theme.sizes.base * 2,
//         paddingRight: theme.sizes.base
//       },
//       headerRightContainerStyle: {
//         alignItems: "center",
//         paddingRight: theme.sizes.base
//       }
//     }
//   }
// );

// export default {

// };
