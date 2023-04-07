import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import Navigation from "./Navigation";

/**
 * This is main page but it is connect with tab Navigation in Navigation.js file.
 *  
 */

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};
