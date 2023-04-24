import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { ThemeProvider } from "styled-components/native";

import theme from "./src/global/styles/theme";
import { Routes } from "./src/routes";
import { UserProvider } from "./src/contexts/UserContext";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await SplashScreen.preventAutoHideAsync();
      try {
        await Font.loadAsync({
          Poppins_400Regular: require("./src/assets/fonts/Poppins-Regular.ttf"),
          Poppins_500Medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
          Poppins_700Bold: require("./src/assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </ThemeProvider>
  );
}
